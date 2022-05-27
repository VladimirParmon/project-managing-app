import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/shared/constants/api-paths';
import { ApiUserLogInResp, ApiUserSignUpResp, UserLogIn, UserSignUp } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  constructor(private http: HttpClient) {}

  signUp(user: UserSignUp): Observable<ApiUserSignUpResp> {
    return this.http.post<ApiUserSignUpResp>(ApiPaths.signUp, { ...user });
  }

  singIn(user: UserLogIn): Observable<ApiUserLogInResp> {
    return this.http.post<ApiUserLogInResp>(ApiPaths.signIn, { ...user });
  }
}
