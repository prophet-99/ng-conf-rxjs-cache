import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EMPTY, Observable, of, shareReplay, switchMap, timer } from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyStateService {
  private _CACHE_TIME = 10_000;
  private _apiKey$!: Observable<{ apiKey: string }> | null;

  constructor(private _httpClient: HttpClient) {}

  //* -> IT'S LIKE A FACTORY
  public getApiKey$(): Observable<{ apiKey: string }> {
    if (this._apiKey$) return this._apiKey$;

    this._apiKey$ = this._httpClient
      .get<{ apiKey: string }>(`${environment.baseApiUrl}/api-key`)
      .pipe(shareReplay());
    setTimeout(() => (this._apiKey$ = null), this._CACHE_TIME);
    return this._apiKey$;
  }
}
