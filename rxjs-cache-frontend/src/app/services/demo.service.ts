import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  private _API_URL = `${environment.baseApiUrl}/demo`;

  constructor(private _httpClient: HttpClient) {}

  public getTest(): Observable<{
    message: string;
    apiKeyUsed: string;
  }> {
    return this._httpClient.get<{
      message: string;
      apiKeyUsed: string;
    }>(this._API_URL);
  }
}
