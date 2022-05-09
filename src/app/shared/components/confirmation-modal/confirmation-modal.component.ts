/* eslint-disable ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { handleDeleteColumn } from 'src/app/redux/actions/board.actions';
import { handleDeleteBoard } from 'src/app/redux/actions/boards.actions';
import { MAStore, TColumns } from 'src/app/redux/models/store.model';
import { selectColumns } from 'src/app/redux/selectors/board.selector';

@Component({
  selector: 'ma-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit, OnDestroy {
  columns!: TColumns;

  observer$!: Subscription;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string; entity: string; columnId: string; boardId: string }
  ) {}

  ngOnInit(): void {
    this.observer$ = (this.store as Store<MAStore>)
      .pipe(select(selectColumns))
      .subscribe((columns) => {
        this.columns = columns;
      });
  }

  deleteBoard() {
    const { id } = this.data;
    this.switchActionType(id);
  }

  switchActionType(id: string) {
    switch (this.data.entity) {
      case 'board': {
        return this.store.dispatch(handleDeleteBoard({ id }));
      }

      case 'column': {
        const { boardId, columnId } = this.data;
        const { columns } = this;

        return this.store.dispatch(handleDeleteColumn({ boardId, columnId, columns }));
      }

      default: {
        return null;
      }
    }
  }

  ngOnDestroy(): void {
    this.observer$.unsubscribe();
  }
}
