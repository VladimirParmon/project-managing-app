import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { postNewTask } from 'src/app/redux/actions/task.actions';
import { IDescriptionProps, ITaskCreate } from 'src/app/shared/models/board.model';

@Component({
  selector: 'ma-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnInit {
  public descriptionProps: IDescriptionProps = {
    status: '',
    priority: '',
    deadline: '',
    actualDescription: '',
  };

  public taskData: ITaskCreate = {
    title: '',
    order: 0,
    description: '',
    boardId: this.data.boardId,
    columnId: this.data.columnId,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string; columnId: string },
    private store: Store
  ) {}

  ngOnInit(): void {}

  onClickingSave(): void {
    this.store.dispatch(postNewTask({ taskData: this.prepareTaskData() }));
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

  getDescriptionProps(): string {
    return JSON.stringify(this.descriptionProps);
  }

  prepareTaskData(): ITaskCreate {
    const description = this.getDescriptionProps();
    const dataToBeSent = { ...this.taskData, description: description };
    return dataToBeSent;
  }

  selectedValueHandler(event: MatSelectChange, selectorType: string): void {
    const valueToEmit = event.source.triggerValue;
    switch (selectorType) {
      case 'status':
        this.descriptionProps.status = valueToEmit;
        break;
      case 'priority':
        this.descriptionProps.priority = valueToEmit;
        break;
    }
  }
}
