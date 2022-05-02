import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-greeting-page',
  templateUrl: './greeting-page.component.html',
  styleUrls: ['./greeting-page.component.scss'],
})
export class GreetingPageComponent {
  emailInputString: string = '';

  constructor(private store: Store, router: Router) {}

  submitEmailForRegistration(): void {
    //TODO: submit for registration and redirect to login page
  }
}
