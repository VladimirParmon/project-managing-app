import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TBoards, TColumns } from 'src/app/redux/models/store.model';
import { IBoard, IColumn } from 'src/app/shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  fetchBoards() {
    return this.http.get<TBoards>('boards');
  }

  createBoard(title: string) {
    return this.http.post<IBoard>('boards', { title });
  }

  deleteBoard(id: string) {
    return this.http.delete<IBoard>(`boards/${id}`);
  }

  fetchColumnsById(id: string) {
    return this.http.get<TColumns>(`boards/${id}/columns`);
  }

  createColumn(id: string, title: string, order: number) {
    return this.http.post<IColumn>(`boards/${id}/columns`, { title, order });
  }

  deleteColumn(boardId: string, columnId: string) {
    return this.http.delete<IColumn>(`boards/${boardId}/columns/${columnId}`);
  }

  updateColumn(boardId: string, columnId: string, title: string, order: number) {
    return this.http.put<IColumn>(`boards/${boardId}/columns/${columnId}`, { title, order });
  }
}
