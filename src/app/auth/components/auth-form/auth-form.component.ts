import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { onLogInSubmit, onSignUpSubmit } from 'src/app/redux/actions/user-data.actions';
import { FormMode } from '../../constants/auth-form.constants';

@Component({
  selector: 'ma-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  readonly FormMode = FormMode;

  public activeFormMode: FormMode = FormMode.registration;

  constructor(private store: Store) {}

  selectFormMode(mode: FormMode): void {
    this.activeFormMode = mode;
  }

  authFormSubmit(user: UserSignUp | UserLogIn): void {
    // check incoming user object from what form it came.
    const isSignUpping = Object.prototype.hasOwnProperty.call(user, 'name');

    this.store.dispatch(
      isSignUpping
        ? onSignUpSubmit({ user: user as UserSignUp })
        : onLogInSubmit({ user: user as UserLogIn })
    );
  }
}
