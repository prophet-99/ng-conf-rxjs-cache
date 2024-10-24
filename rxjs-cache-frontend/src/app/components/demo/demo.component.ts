import { Component, signal } from '@angular/core';

import { AccessTokenStateService } from '../../state/access-token-state.service';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styles: ``,
})
export class DemoComponent {
  public example1 = '-';
  public example2 = '-';
  public example3 = '-';
  public example4 = '-';

  constructor(
    private _demoService: DemoService,
    public accessTokenStateService: AccessTokenStateService
  ) {}

  public initTest(): void {
    // EXAMPLE ONE
    this._demoService.getTest().subscribe({
      next: (res) => {
        console.log('Example 1) ', res);
        this.example1 = JSON.stringify(res);
      },
      error: (err) => {
        console.log('Example 1) ', err);
        this.example1 = JSON.stringify(err);
      },
    });

    // EXAMPLE TWO
    this._demoService.getTest().subscribe({
      next: (res) => {
        console.log('Example 2) ', res);
        this.example2 = JSON.stringify(res);
      },
      error: (err) => {
        console.log('Example 2) ', err);
        this.example2 = JSON.stringify(err);
      },
    });

    // EXAMPLE THREE
    setTimeout(() => {
      this._demoService.getTest().subscribe({
        next: (res) => {
          console.log('Example 3) ', res);
          this.example3 = JSON.stringify(res);
        },
        error: (err) => {
          console.log('Example 3) ', err);
          this.example3 = JSON.stringify(err);
        },
      });
    }, 1_000);

    // EXAMPLE FOUR
    setTimeout(() => {
      this._demoService.getTest().subscribe({
        next: (res) => {
          console.log('Example 4) ', res);
          this.example4 = JSON.stringify(res);
        },
        error: (err) => {
          console.log('Example 4) ', err);
          this.example4 = JSON.stringify(err);
        },
      });
    }, 11_000);
  }
}
