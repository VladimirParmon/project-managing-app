import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

export interface ErrorAction extends Action {
  err: HttpErrorResponse;
}
