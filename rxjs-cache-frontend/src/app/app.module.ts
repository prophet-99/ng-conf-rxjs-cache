import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { DemoComponent } from './components/demo/demo.component';
import { MockComponent } from './components/mock/mock.component';
import { HttpSecurityInterceptor } from './interceptors/http-security.interceptor';

@NgModule({
  declarations: [AppComponent, AuthComponent, DemoComponent, MockComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'mock',
        component: MockComponent,
      },
    ]),
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpSecurityInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
