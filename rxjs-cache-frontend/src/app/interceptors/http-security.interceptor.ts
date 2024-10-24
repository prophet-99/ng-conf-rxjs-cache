import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { concatMap, Observable } from 'rxjs';

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
    return this._apiKeyStateService.apiKey$.pipe(
      concatMap(({ apiKey }) => {
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
            'x-api-key': apiKey,
          },
        });
        return next.handle(newRequest);
      })
    );
  }
}
