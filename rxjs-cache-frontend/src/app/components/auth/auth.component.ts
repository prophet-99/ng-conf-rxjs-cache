import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { JwtStateService } from '../../state/jwt-state.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: ``,
})
export class AuthComponent implements OnInit {
  public authForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _jwtStateService: JwtStateService
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

    this._jwtStateService.authenticate(username, password).subscribe({
      next: () => {
        console.log('Success Login');
        this._router.navigateByUrl('/mock');
      },
      error: () => console.error('Failed Login'),
    });
  }
}
