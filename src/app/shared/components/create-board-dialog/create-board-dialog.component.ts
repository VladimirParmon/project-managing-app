import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { BoardService } from 'src/app/board/services/board.service';
import { createBoard } from 'src/app/redux/actions/boards.actions';
import { createColumn } from 'src/app/redux/actions/board.actions';
import { Subscription } from 'rxjs';
import { MAStore } from 'src/app/redux/models/store.model';
import { selectColumns } from 'src/app/redux/selectors/board.selector';

@Component({
  selector: 'ma-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
})
export class CreateBoardDialogComponent implements OnInit, OnDestroy {
  modelInfo!: FormGroup;

  triedToSubmit = false;

  observer$!: Subscription;

  columnsCount!: number;

  dialogData = {
    boardId: '',
    label: '',
    title: '',
    operation: '',
  };

  constructor(
    fb: FormBuilder,
    public boardService: BoardService,
    public dialog: MatDialog,
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: { label: string; title: string; operation: string; boardId: string }
  ) {
    this.boardService = boardService;

    this.dialogData = data;

    this.modelInfo = fb.group(
      {
        title: ['', [Validators.minLength(3), Validators.maxLength(100)]],
      },
      {
        updateOn: 'blur',
      }
    );
  }

  ngOnInit(): void {
    this.observer$ = (this.store as Store<MAStore>)
      .pipe(select(selectColumns))
      .subscribe((columns) => {
        this.columnsCount = columns.length;
      });
  }

  get title() {
    return this.modelInfo.get('title');
  }

  submit(f: FormGroup) {
    if (!this.triedToSubmit) {
      this.triedToSubmit = true;
    }

    if (f.invalid) return;

    const title = this.title?.value as string;
    const { boardId } = this.dialogData;

    this.switchActionType(title, boardId);

    this.dialog.closeAll();
  }

  switchActionType(title: string, boardId: string) {
    switch (this.dialogData.title) {
      case 'Create new board': {
        return this.store.dispatch(createBoard({ title }));
      }

      case 'Create new column': {
        const order = this.columnsCount + 1;

        return this.store.dispatch(createColumn({ boardId, title, order }));
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
