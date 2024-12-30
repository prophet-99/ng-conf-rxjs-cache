import { Component } from '@angular/core';
import { JwtStateService } from '../../state/jwt-state.service';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
})
export class MockComponent {
  constructor(public jwtStateService: JwtStateService) {}
}
