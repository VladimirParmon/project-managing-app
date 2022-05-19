import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectUserId, onLogInSubmit, onSignUpSubmit } from 'src/app/redux';
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

  public preWrittenEmail: string | null | undefined = null;

  public activeFormMode: FormMode = FormMode.login;

  private userId$ = this.store.select(selectUserId);

  private subscription = new Subscription();

  constructor(private store: Store, private router: Router) {
    this.preWrittenEmail = this.router.getCurrentNavigation()?.extras.state?.['mail'];
  }

  ngOnInit(): void {
    this.subscription.add(
      this.userId$.subscribe((id) => {
        if (id && id !== '') {
          // check if user id is already in store we can go to main page
          this.router.navigate([UrlPaths.board]);
        }
      })
    );

    if (this.preWrittenEmail === '' || this.preWrittenEmail) {
      this.activeFormMode = FormMode.registration;
    } else {
      this.activeFormMode = FormMode.login;
    }
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
