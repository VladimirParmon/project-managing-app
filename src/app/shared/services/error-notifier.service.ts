import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAppErrorMessage } from 'src/app/redux';

@Injectable({
  providedIn: 'root',
})
export class ErrorNotifierService implements OnDestroy {
  private appError$ = this.store.select(selectAppErrorMessage);

  private subscription = new Subscription();

  constructor(private msb: MatSnackBar, private store: Store) {
    this.subscription.add(
      this.appError$.subscribe((msg) => {
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
