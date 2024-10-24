import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccessTokenStateService {
  private _tokenSubject = new BehaviorSubject<string>('-');
  public token$ = this._tokenSubject.asObservable();

  public setToken(accessToken: string): void {
    this._tokenSubject.next(accessToken);
  }

  public getToken(): string {
    return this._tokenSubject.getValue();
  }
}
