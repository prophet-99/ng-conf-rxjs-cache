import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyStateService {
  public apiKey$ = this._httpClient.get<{ apiKey: string }>(
    `${environment.baseApiUrl}/api-key`
  );

  constructor(private _httpClient: HttpClient) {}
}
