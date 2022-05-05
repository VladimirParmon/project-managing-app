import { Injectable, OnDestroy } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserAuthToken } from 'src/app/redux/selectors/user.selectors';
import { ApiPaths } from 'src/app/shared/constants/api-paths';

@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnDestroy {
  private token: string = '';

  private token$ = this.store.select(selectUserAuthToken);

  private subscription = new Subscription();

  constructor(private store: Store) {
    this.subscription.add(
      this.token$.subscribe((value) => {
        if (value && value.length > 0) {
          this.token = value;
        }
      })
    );
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        url: request.url.replace(ApiPaths.auth, ''),
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
