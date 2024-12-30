import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _API_URL = `${environment.baseApiUrl}/auth`;

  constructor(private _httpClient: HttpClient) {}

  public loginByUsernameAndPassword(
    username: string,
    password: string
  ): Observable<AuthToken> {
    return this._httpClient.post<AuthToken>(`${this._API_URL}/login`, {
      username,
      password,
    });
  }

  public refreshToken(jwt: string): Observable<AuthToken> {
    return this._httpClient.post<AuthToken>(`${this._API_URL}/refresh-token`, {
      refreshToken: jwt,
    });
  }
}
