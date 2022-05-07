import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TBoards } from 'src/app/redux/models/store.model';
import { IBoard } from 'src/app/shared/models/board.model';

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
}
