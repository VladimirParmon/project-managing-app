import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { selectUserName, onLogOutSubmit } from 'src/app/redux';
import { UrlPaths } from 'src/app/shared/constants/url-paths';
import { Location } from '@angular/common';

@Component({
  selector: 'ma-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  public isAuthActionsVisible: boolean = false;

  public userName: string | undefined = '';

  private userName$ = this.store.select(selectUserName);

  private subscription = new Subscription();

  public isAbleToGoBack: boolean = false;

  public isGreetingPage: boolean = false;

  constructor(private router: Router, private store: Store, private location: Location) {
    this.subscription.add(
      this.router.events
        .pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),
          tap((data) => {
            const currentPageUrl = data.urlAfterRedirects;
            const removeForwardSlash = currentPageUrl.slice(1);
            if (!this.userName) {
              this.isAuthActionsVisible = !currentPageUrl.includes(UrlPaths.auth);
            }
            this.isAbleToGoBack = !(
              removeForwardSlash === UrlPaths.board || removeForwardSlash === UrlPaths.greeting
            );
            this.isGreetingPage = removeForwardSlash === UrlPaths.greeting;
          })
        )
        .subscribe()
    );

    this.subscription.add(
      this.userName$.subscribe((name) => {
        this.userName = name;
      })
    );
  }

  goToAuth(): void {
    this.router.navigate([UrlPaths.auth, UrlPaths.login]);
  }

  goToSettings(): void {
    this.router.navigate([UrlPaths.auth, UrlPaths.settings]);
  }

  logOut(): void {
    this.store.dispatch(onLogOutSubmit());
    this.router.navigate([UrlPaths.greeting]);
  }

  goHome(): void {
    this.router.navigate([UrlPaths.home]);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
