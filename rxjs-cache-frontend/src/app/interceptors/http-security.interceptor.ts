import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import {
  catchError,
  concatMap,
  Observable,
  retry,
  switchMap,
  throwError,
} from 'rxjs';

import { ApiKeyStateService } from '../state/api-key-state.service';
import { AccessTokenStateService } from '../state/access-token-state.service';

@Injectable()
export class HttpSecurityInterceptor implements HttpInterceptor {
  constructor(
    private _accessTokenStateService: AccessTokenStateService,
    private _apiKeyStateService: ApiKeyStateService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const excludeUrls = ['auth/login', 'api-key'];
    if (excludeUrls.some((url) => request.url.includes(url)))
      return next.handle(request);

    const accessToken = this._accessTokenStateService.getToken();
    return this._apiKeyStateService.getApiKey$().pipe(
      concatMap(({ apiKey }) => {
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
            'x-api-key': apiKey,
          },
        });

        return next.handle(newRequest).pipe(
          catchError((error) => {
            console.log('==> Error in interceptor:', error);

            if (
              error instanceof HttpErrorResponse &&
              (error.status === 401 || error.status === 403)
            ) {
              this._apiKeyStateService.invalidateApiKey();

              return this._apiKeyStateService.getApiKey$().pipe(
                switchMap((newApiKey) => {
                  const retryRequest = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${accessToken}`,
                      'x-api-key': newApiKey.apiKey,
                    },
                  });
                  return next.handle(retryRequest);
                }),
                retry(2), //* -> Try 2 times
                catchError((retryError) => {
                  return throwError(() => retryError);
                })
              );
            }
            return throwError(() => error);
          })
        );
      })
    );
  }
}
