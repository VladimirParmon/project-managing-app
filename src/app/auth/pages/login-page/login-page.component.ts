import { Component } from '@angular/core';
import { ErrorNotifierService } from 'src/app/shared/services/error-notifier.service';

@Component({
  selector: 'ma-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private errorService: ErrorNotifierService) {}
}
