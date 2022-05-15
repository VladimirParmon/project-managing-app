import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TBoards, TColumns, TTasks } from 'src/app/redux/models/store.model';
import { ApiPaths } from 'src/app/shared/constants/api-paths';
import { IBoard, IColumn, ITask, ITaskCreate } from 'src/app/shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  readonly baseReqUrl = `${ApiPaths.boards}${ApiPaths.auth}`;

  constructor(private http: HttpClient) {}

  fetchBoards() {
    return this.http.get<TBoards>(this.baseReqUrl);
  }

  createBoard(title: string) {
    return this.http.post<IBoard>(this.baseReqUrl, { title });
  }

  deleteBoard(id: string) {
    return this.http.delete<IBoard>(`${this.baseReqUrl}/${id}`);
  }

  fetchColumnsById(id: string) {
    return this.http.get<TColumns>(`${this.baseReqUrl}/${id}/${ApiPaths.columns}`);
  }

  createColumn(id: string, title: string, order: number) {
    return this.http.post<IColumn>(`${this.baseReqUrl}/${id}/${ApiPaths.columns}`, {
      title,
      order,
    });
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete<IColumn>(
      `${this.baseReqUrl}/${boardId}/${ApiPaths.columns}/${columnId}`
    );
  }

  updateColumn(boardId: string, columnId: string, title: string, order: number) {
    return this.http.put<IColumn>(`${this.baseReqUrl}/${boardId}/${ApiPaths.columns}/${columnId}`, {
      title,
      order,
    });
  }

  createTask(taskData: ITaskCreate, id: string | undefined) {
    return this.http.post<ITask>(
      `${this.baseReqUrl}/${taskData.boardId}/${ApiPaths.columns}/${taskData.columnId}/${ApiPaths.tasks}`,
      {
        title: taskData.title,
        order: taskData.order,
        description: taskData.description,
        userId: id,
      }
    );
  }

  getAllTasks(taskData: ITaskCreate | { boardId: string; columnId: string }) {
    return this.http.get<TTasks>(
      `${this.baseReqUrl}/${taskData.boardId}/${ApiPaths.columns}/${taskData.columnId}/${ApiPaths.tasks}`
    );
  }

  deleteTask(boardId: string, columnId: string, taskId: string) {
    return this.http.delete<TTasks>(
      `${this.baseReqUrl}/${boardId}/${ApiPaths.columns}/${columnId}/${ApiPaths.tasks}/${taskId}`
    );
  }
}
