import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { fetchBoardInfo } from 'src/app/redux/actions/column.actions';
import { TColumns } from 'src/app/redux/models/store.model';
import { selectColumns } from 'src/app/redux/selectors/board.selector';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { CreateBoardDialogComponent } from 'src/app/shared/components/create-board-dialog/create-board-dialog.component';
import {
  DialogDataLabels,
  DialogDataOperations,
  DialogDataTitles,
} from 'src/app/shared/constants/dialog.constants';
import { selectCurrentOpenedBoardTitle } from 'src/app/redux/selectors/title.selectors';
import { CreateTaskDialogComponent } from '../../components/create-task-dialog/create-task-dialog.component';
import { selectTasks } from 'src/app/redux/selectors/tasks.selector';
import { IDescriptionProps } from 'src/app/shared/models/board.model';

@Component({
  selector: 'ma-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  private boardId: string | null = '';

  public columns: TColumns = [];

  private observer$: Subscription;

  private columns$ = this.store.select(selectColumns);
  public currentBoardTitle$ = this.store.select(selectCurrentOpenedBoardTitle);
  public tasks$ = this.store.select(selectTasks);

  constructor(private store: Store, private route: ActivatedRoute, public dialog: MatDialog) {
    this.observer$ = this.columns$.subscribe((columns) => {
      this.columns = [...columns];
    });
  }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id');

    if (this.boardId) {
      this.store.dispatch(fetchBoardInfo({ id: this.boardId }));
    }
  }

  createColumn() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.position = { top: '5%' };
    dialogConfig.panelClass = 'dialog-container';
    dialogConfig.data = {
      title: DialogDataTitles.column,
      operation: DialogDataOperations.create,
      label: DialogDataLabels.column,
      boardId: this.boardId,
    };

    this.dialog.open(CreateBoardDialogComponent, dialogConfig);
  }

  createTask(parentColumnId: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.position = { top: '5%' };
    dialogConfig.panelClass = 'dialog-container';
    dialogConfig.width = '100%';
    dialogConfig.maxWidth = '1000px';
    dialogConfig.data = {
      boardId: this.boardId,
      columnId: parentColumnId,
    };

    this.dialog.open(CreateTaskDialogComponent, dialogConfig);
  }

  handleDeleteColumn(columnId: string) {
    const dialogConfig = new MatDialogConfig();

    const { boardId } = this;

    dialogConfig.data = { boardId, columnId, entity: DialogDataLabels.column };
    dialogConfig.panelClass = 'dialog-container';
    dialogConfig.position = { top: '5%' };

    this.dialog.open(ConfirmationModalComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.observer$.unsubscribe();
  }

  parseJSON(whatToParse: string): IDescriptionProps {
    return JSON.parse(whatToParse);
  }

  handleDeleteTask(boardId: string, columnId: string, taskId: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { boardId, columnId, taskId, entity: 'task' };
    dialogConfig.panelClass = 'dialog-container';
    dialogConfig.position = { top: '5%' };

    this.dialog.open(ConfirmationModalComponent, dialogConfig);
  }
}
