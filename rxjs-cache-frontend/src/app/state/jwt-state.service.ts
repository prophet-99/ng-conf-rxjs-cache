import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  map,
  Observable,
  of,
  ReplaySubject,
  share,
  switchMap,
  tap,
  timer,
} from 'rxjs';

import { AuthService, type AuthToken } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class JwtStateService {
  private _tokens!: AuthToken;
  private _remainingTime: number | null = null;
  private _storageName = 'JWT_TOKENS';
  public authToken$ = of(null).pipe(
    switchMap(() => of(this._tokens.accessToken)),
    share({
      resetOnComplete: () => {
        return timer((this._remainingTime as number) * 1_000).pipe(
          switchMap(() =>
            this._authService
              .refreshToken(this._tokens.refreshToken)
              .pipe(tap(this._configureJWT.bind(this)))
          )
        );
      },
      connector: () => new ReplaySubject(1),
    })
  );

  constructor(private _authService: AuthService, private _router: Router) {
    const tokens = localStorage.getItem(this._storageName);
    if (tokens) this._configureJWT(JSON.parse(tokens));

    if (this._remainingTime && this._remainingTime <= 0) {
      localStorage.removeItem(this._storageName);
      _router.navigateByUrl('');
    }
  }

  private _configureJWT(tokens: AuthToken) {
    this._tokens = tokens;
    localStorage.setItem(this._storageName, JSON.stringify(tokens));

    const { accessToken } = tokens;
    const parsedPayload = JSON.parse(atob(accessToken.split('.')[1]));

    const currentTime = Math.floor(Date.now() / 1000);
    this._remainingTime = parsedPayload.exp - currentTime;
    //! FOR DEBUGING PURPOSES ONLY
    console.warn(
      '[jwt-state.service.ts] | remainingTime:',
      this._remainingTime
    );
  }

  public authenticate(username: string, password: string): Observable<boolean> {
    return this._authService
      .loginByUsernameAndPassword(username, password)
      .pipe(
        tap((tokens) => this._configureJWT(tokens)),
        map(() => true)
      );
  }
}
