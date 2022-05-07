import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectUserId } from 'src/app/redux';
import { onLogInSubmit, onSignUpSubmit } from 'src/app/redux/actions/user-data.actions';
import { UrlPaths } from 'src/app/shared/constants/url-paths';
import { FormMode } from '../../constants/auth-form.constants';
import { UserLogIn, UserSignUp } from '../../models/auth.model';

@Component({
  selector: 'ma-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, OnDestroy {
  readonly FormMode = FormMode;

  public activeFormMode: FormMode = FormMode.registration;

  private userId$ = this.store.select(selectUserId);

  private subscription = new Subscription();

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userId$.subscribe((id) => {
        if (id && id !== '') {
          // check if user id is already in store we can go to main page
          this.router.navigate([UrlPaths.board]);
        }
      })
    );
  }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
