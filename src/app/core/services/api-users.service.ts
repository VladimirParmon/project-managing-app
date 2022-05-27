import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiUserDeleteRequest,
  ApiUserSignUpResp,
  ApiUserUpdateDataRequest,
  ApiUserUpdateDataResp,
} from 'src/app/auth/models/auth.model';
import { ApiPaths } from 'src/app/shared/constants/api-paths';

@Injectable({
  providedIn: 'root',
})
export class ApiUsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<ApiUserSignUpResp[]> {
    return this.http.get<ApiUserSignUpResp[]>(ApiPaths.users + ApiPaths.auth);
  }

  updateUser(user: ApiUserUpdateDataRequest): Observable<ApiUserUpdateDataResp> {
    const { id, name, login, password, newPassword } = user;
    const updateBody = { name, login, password: newPassword || password };
    return this.http.put<ApiUserUpdateDataResp>(
      `${ApiPaths.users}/${id}${ApiPaths.auth}`,
      updateBody
    );
  }

  deleteUser<T>(user: ApiUserDeleteRequest): Observable<T> {
    return this.http.delete<T>(`${ApiPaths.users}/${user.id}${ApiPaths.auth}`);
  }
}
