import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectUserId } from 'src/app/redux';
import { UrlPaths } from 'src/app/shared/constants/url-paths';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad, OnDestroy {
  private isAuthorized: boolean = false;

  private userId$ = this.store.select(selectUserId);

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private store: Store) {
    this.subscription.add(
      this.userId$.subscribe((id) => {
        this.isAuthorized = Boolean(id && id.length > 0);
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean> {
    const lastPathSegment = state.url.split('/').slice(-1)[0];
    return this.handleRoute(lastPathSegment);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Promise<boolean> {
    const lastPathSegment = segments.length > 0 ? segments.slice(-1)[0].path : '';
    return this.handleRoute(lastPathSegment);
  }

  private handleRoute(path: string | undefined): boolean | UrlTree {
    const throwToAuth =
      this.isAuthorized || this.router.createUrlTree([UrlPaths.auth, UrlPaths.login]);

    const throwToMain = !this.isAuthorized || this.router.createUrlTree([UrlPaths.board]);

    const throwToGreetings = this.router.createUrlTree([UrlPaths.greeting]);

    const throwToNotFound = this.router.createUrlTree([UrlPaths.notFound]);

    switch (path) {
      case '':
        return throwToGreetings;
      case UrlPaths.greeting:
        return throwToMain;
      case UrlPaths.auth:
        return throwToNotFound;
      case UrlPaths.settings:
        return throwToAuth;
      case UrlPaths.login:
        return throwToMain;
      default:
        return throwToAuth;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
