import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { postNewTask, updateTaskOnServer } from 'src/app/redux/actions/task.actions';
import { IDescriptionProps, ITask, ITaskCreate } from 'src/app/shared/models/board.model';
import { filterPastDays } from '../../utils/filter-past-days';
import { statusOptionsValues, priorityOptionsValues } from '../../constants/operations';

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
    boardId: '',
    columnId: '',
  };

  public statusValues;
  public priorityValues;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { task: ITask; taskIsCreatedAndNotUpdated: boolean },
    private store: Store
  ) {
    if (!data.taskIsCreatedAndNotUpdated) {
      this.taskData.title = data.task.title;
      this.taskData.order = data.task.order;
      this.descriptionProps = this.getDescriptionOfTheTaskToBeUpdated(this.data.task.description);
    }
    this.taskData.boardId = data.task.boardId;
    this.taskData.columnId = data.task.columnId;
    this.statusValues = statusOptionsValues;
    this.priorityValues = priorityOptionsValues;
  }

  onClickingSave(): void {
    if (this.data.taskIsCreatedAndNotUpdated) {
      this.store.dispatch(postNewTask({ taskData: this.prepareTaskDataToCreateTask() }));
    } else {
      this.store.dispatch(updateTaskOnServer({ taskData: this.prepareTaskDataToUpdateTask() }));
    }
  }

  getDescriptionProps(): string {
    return JSON.stringify(this.descriptionProps);
  }

  getDescriptionOfTheTaskToBeUpdated(jsonString: string): IDescriptionProps {
    return JSON.parse(jsonString);
  }

  prepareTaskDataToCreateTask(): ITaskCreate {
    const description = this.getDescriptionProps();
    const dataToBeSent = { ...this.taskData, description };
    return dataToBeSent;
  }

  prepareTaskDataToUpdateTask(): ITask {
    const description = this.getDescriptionProps();
    const dataToBeSent = {
      ...this.taskData,
      description,
      id: this.data.task.id,
      userId: this.data.task.userId,
    };
    return dataToBeSent;
  }
}
