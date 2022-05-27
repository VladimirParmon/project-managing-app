/* eslint-disable ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { handleDeleteBoard } from 'src/app/redux/actions/board.actions';
import { handleDeleteColumn } from 'src/app/redux/actions/column.actions';
import { deleteTaskOnServer } from 'src/app/redux/actions/task.actions';
import { TColumns } from 'src/app/redux/models/store.model';
import { selectColumns } from 'src/app/redux/selectors/board.selector';
import { DialogDataLabels } from '../../constants/dialog.constants';

@Component({
  selector: 'ma-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit, OnDestroy {
  private columns: TColumns = [];

  private columns$ = this.store.select(selectColumns);

  private observer$ = new Subscription();

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    readonly data: { id: string; entity: string; columnId: string; boardId: string; taskId: string }
  ) {}

  ngOnInit(): void {
    this.observer$ = this.columns$.subscribe((columns) => {
      this.columns = columns;
    });
  }

  deleteBoard(): void {
    const { id } = this.data;
    this.switchActionType(id);
  }

  switchActionType(id: string) {
    switch (this.data.entity) {
      case DialogDataLabels.board: {
        this.store.dispatch(handleDeleteBoard({ id }));
        break;
      }

      case DialogDataLabels.column: {
        const { boardId, columnId } = this.data;
        const { columns } = this;

        this.store.dispatch(handleDeleteColumn({ boardId, columnId, columns }));
        break;
      }

      case DialogDataLabels.task: {
        const { boardId, columnId, taskId } = this.data;

        this.store.dispatch(deleteTaskOnServer({ boardId, columnId, taskId }));
        break;
      }

      default: {
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.observer$.unsubscribe();
  }
}
