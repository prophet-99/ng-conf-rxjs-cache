import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _API_URL = `${environment.baseApiUrl}/auth/login`;

  constructor(private _httpClient: HttpClient) {}

  public loginByUsernameAndPassword(
    username: string,
    password: string
  ): Observable<string> {
    return this._httpClient
      .post<{ accessToken: string }>(this._API_URL, {
        username,
        password,
      })
      .pipe(map(({ accessToken }) => accessToken));
  }
}
