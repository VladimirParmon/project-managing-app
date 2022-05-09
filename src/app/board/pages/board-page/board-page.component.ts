import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { fetchBoardInfo } from 'src/app/redux/actions/board.actions';
import { MAStore, TColumns } from 'src/app/redux/models/store.model';
import { selectColumns } from 'src/app/redux/selectors/board.selector';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { CreateBoardDialogComponent } from 'src/app/shared/components/create-board-dialog/create-board-dialog.component';

@Component({
  selector: 'ma-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  boardId!: string;

  columns!: TColumns;

  observer$: Subscription;

  constructor(private store: Store, private route: ActivatedRoute, public dialog: MatDialog) {
    this.observer$ = (this.store as Store<MAStore>)
      .pipe(select(selectColumns))
      .subscribe((columns) => {
        this.columns = columns;
      });
  }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id') as string;
    this.store.dispatch(fetchBoardInfo({ id: this.boardId }));
  }

  createColumn() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.position = { top: '5%' };
    dialogConfig.panelClass = 'dialog-container';

    dialogConfig.data = (() => {
      const title = 'Create new column';
      const operation = title.split(' ')[0];
      const label = title.split(' ')[2];
      const { boardId } = this;

      return {
        title,
        operation,
        label,
        boardId,
      };
    })();

    this.dialog.open(CreateBoardDialogComponent, dialogConfig);
  }

  handleDeleteColumn(columnId: string) {
    const dialogConfig = new MatDialogConfig();

    const { boardId } = this;

    dialogConfig.data = { boardId, columnId, entity: 'column' };
    dialogConfig.panelClass = 'dialog-container';
    dialogConfig.position = { top: '5%' };

    this.dialog.open(ConfirmationModalComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.observer$.unsubscribe();
  }
}
