/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UrlPaths } from 'src/app/shared/constants/url-paths';

@Component({
  selector: 'ma-greeting-page',
  templateUrl: './greeting-page.component.html',
  styleUrls: ['./greeting-page.component.scss'],
})
export class GreetingPageComponent {
  emailInputString: string = '';

  constructor(private store: Store, private router: Router) {}

  submitEmailForRegistration(): void {
    this.router.navigate([UrlPaths.auth, UrlPaths.login], {
      state: { mail: this.emailInputString },
    });
  }
}
