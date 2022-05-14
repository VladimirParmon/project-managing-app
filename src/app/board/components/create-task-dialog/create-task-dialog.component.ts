import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { postNewTask } from 'src/app/redux/actions/task.actions';
import { ITaskCreate } from 'src/app/shared/models/board.model';

@Component({
  selector: 'ma-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnInit {
  public descriptionProps = {
    status: '',
    priority: '',
    deadline: new Date(),
  };

  public taskData: ITaskCreate = {
    title: '',
    order: 0,
    description: JSON.stringify(this.descriptionProps),
    boardId: this.data.boardId,
    columnId: this.data.columnId,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string; columnId: string },
    private store: Store
  ) {}

  ngOnInit(): void {}

  onClickingSave(): void {
    this.store.dispatch(postNewTask({ taskData: this.taskData }));
  }

  filterPastDays = (d: Date | null): boolean => {
    const date = d || new Date();
    const currentDate = new Date();
    const comparison =
      date.getFullYear() >= currentDate.getFullYear() &&
      date.getMonth() >= currentDate.getMonth() &&
      date.getDate() >= currentDate.getDate();
    return comparison;
  };
}
