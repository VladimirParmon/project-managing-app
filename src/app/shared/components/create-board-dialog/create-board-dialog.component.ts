import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BoardService } from 'src/app/board/services/board.service';
import { createBoard } from 'src/app/redux/actions/boards.actions';

@Component({
  selector: 'ma-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
})
export class CreateBoardDialogComponent {
  createBoardModelInfo!: FormGroup;

  triedToSubmit = false;

  constructor(
    fb: FormBuilder,
    public boardService: BoardService,
    public dialog: MatDialog,
    private store: Store
  ) {
    this.boardService = boardService;

    this.createBoardModelInfo = fb.group(
      {
        boardName: ['', [Validators.minLength(3), Validators.maxLength(100)]],
      },
      {
        updateOn: 'blur',
      }
    );
  }

  get boardName() {
    return this.createBoardModelInfo.get('boardName');
  }

  submit(f: FormGroup) {
    if (!this.triedToSubmit) {
      this.triedToSubmit = true;
    }

    if (f.invalid) return;

    const title = this.boardName?.value as string;

    this.store.dispatch(createBoard({ title }));

    this.dialog.closeAll();
  }
}
