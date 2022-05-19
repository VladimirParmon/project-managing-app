import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { fetchBoardInfo, handleDragColumn } from 'src/app/redux/actions/column.actions';
import { TColumns, TTasks } from 'src/app/redux/models/store.model';
import { selectColumns } from 'src/app/redux/selectors/board.selector';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { CreateBoardDialogComponent } from 'src/app/shared/components/create-board-dialog/create-board-dialog.component';
import {
  DialogDataLabels,
  DialogDataOperations,
  DialogDataTitles,
} from 'src/app/shared/constants/dialog.constants';
import { selectCurrentOpenedBoardTitle } from 'src/app/redux/selectors/title.selectors';
import { selectTasks } from 'src/app/redux/selectors/tasks.selector';
import { IColumn, IDescriptionProps, ITask } from 'src/app/shared/models/board.model';
import { handleDragTask } from 'src/app/redux';
import { CreateTaskDialogComponent } from '../../components/create-task-dialog/create-task-dialog.component';
import { OPERATIONS } from '../../constants/operations';
import { parseJSON } from '../../utils/parse-json';
import { getPriorityTranslation, getStatusTranslation } from '../../utils/get-translations';

@Component({
  selector: 'ma-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  readonly parseJSON = parseJSON;

  private boardId: string = '';

  public columns: TColumns = [];

  public tasks: TTasks = {};

  private columns$ = this.store.select(selectColumns);

  public currentBoardTitle$ = this.store.select(selectCurrentOpenedBoardTitle);

  private tasks$ = this.store.select(selectTasks);

  private subscription = new Subscription();

  constructor(private store: Store, private route: ActivatedRoute, public dialog: MatDialog) {
    this.subscription.add(
      this.columns$.subscribe((columns) => {
        this.columns = [...columns];
      })
    );

    this.subscription.add(
      this.tasks$.subscribe((tasks) => {
        this.tasks = { ...tasks };
      })
    );
  }

  ngOnInit(): void {
    const idFromRouter: string | null = this.route.snapshot.paramMap.get('id');
    if (idFromRouter) {
      this.boardId = idFromRouter;
    }

    if (this.boardId) {
      this.store.dispatch(fetchBoardInfo({ id: this.boardId }));
    }
  }

  createColumn() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.position = { top: '5%' };
    dialogConfig.panelClass = ['dialog-container', 'small-creation-dialog'];
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

    const taskInfo: ITask = {
      description: '',
      userId: '',
      columnId: parentColumnId,
      boardId: this.boardId,
      order: 0,
      id: '',
      title: '',
    };

    dialogConfig.autoFocus = false;
    dialogConfig.position = { top: '5%' };
    dialogConfig.panelClass = 'dialog-container';
    dialogConfig.width = '100%';
    dialogConfig.maxWidth = '1000px';
    dialogConfig.data = {
      task: taskInfo,
      taskIsCreatedAndNotUpdated: true,
    };

    this.dialog.open(CreateTaskDialogComponent, dialogConfig);
  }

  handleDrop(event: CdkDragDrop<IColumn[]>) {
    const { previousIndex, currentIndex } = event;

    if (previousIndex !== currentIndex) {
      const boardId = this.boardId as string;
      const isOrderDecreasing = previousIndex < currentIndex;
      const operation = isOrderDecreasing ? OPERATIONS.DECREMENT : OPERATIONS.INCREMENT;
      const prevIndexOnBackEnd = previousIndex + 1;
      const currIndexOnBackEnd = currentIndex + 1;
      const currentDragColumn = this.columns.find(({ order }) => order === prevIndexOnBackEnd)!;

      const fixableOrderColumns = this.columns.filter(({ order }) =>
        isOrderDecreasing
          ? order > prevIndexOnBackEnd && order <= currIndexOnBackEnd
          : order >= currIndexOnBackEnd && order < prevIndexOnBackEnd
      );

      this.store.dispatch(
        handleDragColumn({
          boardId,
          fixableOrderColumns,
          currentIndex,
          currentDragColumn,
          operation,
        })
      );

      moveItemInArray(this.columns, previousIndex, currentIndex);
    }
  }

  handleTaskDrag(event: CdkDragDrop<string>) {
    const prevColumnId = event.previousContainer.data;
    const currentColumnId = event.container.data;
    const currentTasks = [...this.tasks[currentColumnId]];
    const { previousIndex, currentIndex } = event;
    const isOrderDecreasing = previousIndex < currentIndex;
    const operation = isOrderDecreasing ? OPERATIONS.DECREMENT : OPERATIONS.INCREMENT;

    const fixableOrderTasks = this.tasks[currentColumnId].filter(({ order }) =>
      isOrderDecreasing
        ? order > previousIndex && order <= currentIndex
        : order >= currentIndex && order < previousIndex
    );

    if (prevColumnId === currentColumnId) {
      moveItemInArray(currentTasks, previousIndex, currentIndex);
      const task = currentTasks.find((item) => item.order === previousIndex);

      // if (task) {
      //   this.store.dispatch(handleDragTask({ task, fixableOrderTasks, operation, currentIndex }));
      // }

      this.tasks[currentColumnId] = currentTasks;
    } else {
      const prevTasks = [...this.tasks[prevColumnId]];
      transferArrayItem(prevTasks, currentTasks, previousIndex, currentIndex);
      this.tasks = { ...this.tasks, [prevColumnId]: prevTasks, [currentColumnId]: currentTasks };
    }
  }

  handleDeleteColumn(columnId: string) {
    const dialogConfig = new MatDialogConfig();

    const { boardId } = this;

    dialogConfig.data = { boardId, columnId, entity: DialogDataLabels.column };
    dialogConfig.panelClass = ['dialog-container', 'deletion-dialog'];
    dialogConfig.position = { top: '5%' };

    this.dialog.open(ConfirmationModalComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleDeleteTask(boardId: string, columnId: string, taskId: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { boardId, columnId, taskId, entity: 'task' };
    dialogConfig.panelClass = ['dialog-container', 'deletion-dialog'];
    dialogConfig.position = { top: '5%' };

    this.dialog.open(ConfirmationModalComponent, dialogConfig);
  }

  handleEditTask(task: ITask) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.position = { top: '5%' };
    dialogConfig.panelClass = 'dialog-container';
    dialogConfig.width = '100%';
    dialogConfig.maxWidth = '1000px';
    dialogConfig.data = {
      task: task,
      taskIsCreatedANdNotUpdated: false,
    };

    this.dialog.open(CreateTaskDialogComponent, dialogConfig);
  }

  getDescriptionField(jsonString: string, field: string): string {
    const description: IDescriptionProps = JSON.parse(jsonString);
    let result = '';
    switch (field) {
      case 'actual':
        result = description.actualDescription;
        break;
      case 'status':
        result = getStatusTranslation(description.status);
        break;
      case 'priority':
        result = getPriorityTranslation(description.priority);
    }
    return result;
  }
}
