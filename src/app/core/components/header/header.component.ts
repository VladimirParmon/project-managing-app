import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { selectUserName, onLogOutSubmit } from 'src/app/redux';
import { UrlPaths } from 'src/app/shared/constants/url-paths';

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

  constructor(private router: Router, private store: Store) {
    this.subscription.add(
      this.router.events
        .pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),
          tap((data) => {
            const currentPageUrl = data.urlAfterRedirects;
            if (!this.userName) {
              this.isAuthActionsVisible = !currentPageUrl.includes(UrlPaths.auth);
            }
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
