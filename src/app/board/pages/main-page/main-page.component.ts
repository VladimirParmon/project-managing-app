/* eslint-disable @angular-eslint/component-selector */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { fetchBoards, handleSaveOpenedBoardName } from 'src/app/redux/actions/board.actions';
import { selectBoards } from 'src/app/redux/selectors/boards.selectors';
import { MAStore, TBoards } from 'src/app/redux/models/store.model';
import { BoardService } from '../../services/board.service';
import {
  DialogDataLabels,
  DialogDataOperations,
  DialogDataTitles,
} from 'src/app/shared/constants/dialog.constants';
import { CreateBoardDialogComponent } from 'src/app/shared/components/create-board-dialog/create-board-dialog.component';
import { Router } from '@angular/router';
import { UrlPaths } from 'src/app/shared/constants/url-paths';

@Component({
  selector: 'ma-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  observer$!: Subscription;

  boards!: TBoards;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    public boardService: BoardService,
    private router: Router
  ) {
    this.observer$ = (this.store as Store<MAStore>)
      .pipe(select(selectBoards))
      .subscribe((state) => {
        this.boards = state;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(fetchBoards());
  }

  ngOnDestroy(): void {
    this.observer$.unsubscribe();
  }

  handleDeleteBoard(id: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { id, entity: 'board' };
    dialogConfig.panelClass = 'dialog-container';
    dialogConfig.position = { top: '5%' };

    this.dialog.open(ConfirmationModalComponent, dialogConfig);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.position = { top: '5%' };
    dialogConfig.panelClass = 'dialog-container';
    dialogConfig.data = {
      title: DialogDataTitles.board,
      operation: DialogDataOperations.create,
      label: DialogDataLabels.board,
    };

    this.dialog.open(CreateBoardDialogComponent, dialogConfig);
  }

  handleRouting(boardName: string, boardId: string): void {
    this.store.dispatch(handleSaveOpenedBoardName({ title: boardName }));
    this.router.navigate([UrlPaths.board, boardId]);
  }
}
