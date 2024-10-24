import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  ReplaySubject,
  share,
  shareReplay,
  tap,
  timer,
} from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyStateService {
  private _CACHE_TIME = 10_000;
  public apiKey$ = this._httpClient
    .get<{ apiKey: string }>(`${environment.baseApiUrl}/api-key`)
    .pipe(
      tap(() => console.log('[API_KEY: cold observable - Request.]')),
      share({
        resetOnComplete: () => timer(this._CACHE_TIME),
        // connector: () => new ReplaySubject(1), // * -> UNCOMMENT THIS 🧐
      })
    );

  constructor(private _httpClient: HttpClient) {}
}
