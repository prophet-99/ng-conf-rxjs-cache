import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, switchMap, timer } from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyStateService {
  private _CACHE_TIME = 10_000;
  private _apiKey!: string;

  constructor(private _httpClient: HttpClient) {
    timer(0, this._CACHE_TIME)
      .pipe(
        switchMap(() =>
          this._httpClient.get<{ apiKey: string }>(
            `${environment.baseApiUrl}/api-key`
          )
        )
      )
      .subscribe(({ apiKey }) => {
        this._apiKey = apiKey;
        console.log('==> Refresh the Api Key', apiKey);
      });
  }

  public getApiKey$(): Observable<{ apiKey: string }> {
    return of({ apiKey: this._apiKey });
  }
}
