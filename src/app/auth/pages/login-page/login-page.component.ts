import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { selectAuthErrorMessage } from 'src/app/redux/selectors/user.selectors';

@Component({
  selector: 'ma-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  private AuthUserError$ = this.store.select(selectAuthErrorMessage);

  constructor(private msb: MatSnackBar, private store: Store) {}

  ngOnInit(): void {
    this.AuthUserError$.subscribe((msg) => {
      if (msg && msg.length > 0) {
        this.msb.open(msg, 'Understood', { duration: 10000, panelClass: ['mat-snack-bar-custom'] });
      }
    });
  }
}
