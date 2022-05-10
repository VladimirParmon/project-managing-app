import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { createBoard } from 'src/app/redux/actions/board.actions';
import { createColumn } from 'src/app/redux/actions/column.actions';
import { Subscription } from 'rxjs';
import { selectColumns } from 'src/app/redux/selectors/board.selector';
import { DialogData } from '../../models/dialog.model';
import { DialogDataTitles, DialogFormControls } from '../../constants/dialog.constants';

@Component({
  selector: 'ma-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.scss'],
})
export class CreateBoardDialogComponent implements OnInit, OnDestroy {
  public modelForm: FormGroup | null = null;

  public triedToSubmit = false;

  private columns$ = this.store.select(selectColumns);

  private columnsCount: number = 0;

  private observer$ = new Subscription();

  constructor(
    public dialog: MatDialog,
    private store: Store,
    @Inject(MAT_DIALOG_DATA)
    readonly dialogData: DialogData
  ) {
    this.modelForm = new FormGroup(
      {
        [DialogFormControls.title]: new FormControl('', [
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      },
      {
        updateOn: 'blur',
      }
    );
  }

  get title(): AbstractControl | null {
    return this.modelForm!.get(DialogFormControls.title);
  }

  ngOnInit(): void {
    this.observer$ = this.columns$.subscribe((columns) => {
      this.columnsCount = columns.length;
    });
  }

  submit(): void {
    if (!this.triedToSubmit) {
      this.triedToSubmit = true;
    }

    if (this.modelForm?.invalid) return;

    const title = this.title?.value;
    const { boardId } = this.dialogData;

    this.switchActionType(title, boardId);

    this.dialog.closeAll();
  }

  switchActionType(title: string, boardId: string) {
    switch (this.dialogData.title) {
      case DialogDataTitles.board: {
        this.store.dispatch(createBoard({ title }));
        break;
      }

      case DialogDataTitles.column: {
        const order = this.columnsCount + 1;

        this.store.dispatch(createColumn({ boardId, title, order }));
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
