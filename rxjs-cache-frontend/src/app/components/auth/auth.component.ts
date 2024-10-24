import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AccessTokenStateService } from '../../state/access-token-state.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: ``,
})
export class AuthComponent implements OnInit {
  public authForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _accessTokenStateService: AccessTokenStateService
  ) {}

  ngOnInit(): void {
    this.authForm = this._formBuilder.group({
      username: ['admin', [Validators.required]],
      password: ['1234', [Validators.required]],
    });
  }

  public login(): void {
    if (this.authForm.invalid) return;
    const { username, password } = this.authForm.value;

    this._authService
      .loginByUsernameAndPassword(username, password)
      .subscribe((token) => this._accessTokenStateService.setToken(token));
  }
}
