import { HttpErrorResponse } from '@angular/common/http';

interface ErrorAction extends Action {
  err: HttpErrorResponse;
}
