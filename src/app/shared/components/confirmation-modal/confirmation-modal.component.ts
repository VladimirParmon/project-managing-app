import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { handleDeleteBoard } from 'src/app/redux/actions/boards.actions';

@Component({
  selector: 'ma-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  constructor(private store: Store, @Inject(MAT_DIALOG_DATA) public data: { id: string }) {}

  deleteBoard() {
    const { id } = this.data;

    this.store.dispatch(handleDeleteBoard({ id }));
  }
}
