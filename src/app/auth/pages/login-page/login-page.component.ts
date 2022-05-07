import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthErrorMessage } from 'src/app/redux';

@Component({
  selector: 'ma-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private AuthUserError$ = this.store.select(selectAuthErrorMessage);

  private subscription = new Subscription();

  constructor(private msb: MatSnackBar, private store: Store) {}

  ngOnInit(): void {
    this.subscription.add(
      this.AuthUserError$.subscribe((msg) => {
        if (msg && msg.length > 0) {
          this.msb.open(msg, 'Understood', {
            duration: 10000,
            panelClass: ['mat-snack-bar-custom'],
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
