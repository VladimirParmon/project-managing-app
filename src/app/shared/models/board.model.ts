export interface IBoard {
  id: string;
  title: string;
}

export interface IColumn extends IBoard {
  order: number;
}

export interface ITask extends IColumn {
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export type ITaskCreate = Omit<ITask, 'id' | 'userId'>;

export interface IDescriptionProps {
  status: string;
  priority: string;
  deadline: Date | string;
  actualDescription: string;
}
