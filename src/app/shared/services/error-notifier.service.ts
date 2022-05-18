import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { clearAppError, selectAppErrorMessage } from 'src/app/redux';

@Injectable({
  providedIn: 'root',
})
export class ErrorNotifierService implements OnDestroy {
  private appError$ = this.store.select(selectAppErrorMessage);

  private subscription = new Subscription();

  private ref!: MatSnackBarRef<TextOnlySnackBar>;

  constructor(private msb: MatSnackBar, private store: Store) {
    this.subscription.add(
      this.appError$.subscribe((msg) => {
        if (msg && msg.length > 0) {
          this.ref = this.msb.open(msg, 'Understood', {
            duration: 5000,
            panelClass: ['mat-snack-bar-custom'],
          });

          this.ref.afterDismissed().subscribe(() => {
            this.store.dispatch(clearAppError());
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
