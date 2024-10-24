import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, tap } from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyStateService {
  // public apiKey$ = this._httpClient.get<{ apiKey: string }>(
  //   `${environment.baseApiUrl}/api-key`
  // );

  constructor(private _httpClient: HttpClient) {}

  public getApiKey$(): Observable<{ apiKey: string }> {
    const apiKeyStore = sessionStorage.getItem('API-KEY');

    if (apiKeyStore) return of({ apiKey: apiKeyStore });

    return this._httpClient
      .get<{ apiKey: string }>(`${environment.baseApiUrl}/api-key`)
      .pipe(tap(({ apiKey }) => sessionStorage.setItem('API-KEY', apiKey)));
  }

  public invalidateApiKey(): void {
    sessionStorage.removeItem('API-KEY');
  }
}
