import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { postNewTask } from 'src/app/redux/actions/task.actions';
import { IDescriptionProps, ITaskCreate } from 'src/app/shared/models/board.model';
import { filterPastDays } from '../../utils/filter-past-days';

@Component({
  selector: 'ma-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent {
  readonly filter = filterPastDays;

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

  onClickingSave(): void {
    this.store.dispatch(postNewTask({ taskData: this.prepareTaskData() }));
  }

  getDescriptionProps(): string {
    return JSON.stringify(this.descriptionProps);
  }

  prepareTaskData(): ITaskCreate {
    const description = this.getDescriptionProps();
    const dataToBeSent = { ...this.taskData, description };
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
      default:
        break;
    }
  }
}
