import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/shared/constants/api-paths';

@Injectable({
  providedIn: 'root',
})
export class ApiUsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<ApiUserSignUpResp[]> {
    return this.http.get<ApiUserSignUpResp[]>(ApiPaths.getUsers + ApiPaths.auth);
  }
}
