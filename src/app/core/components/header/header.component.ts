import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { selectUserName, onLogOutSubmit } from 'src/app/redux';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from 'src/app/shared/components/create-board-dialog/create-board-dialog.component';
import { UrlPaths } from 'src/app/shared/constants/url-paths';
import {
  DialogDataLabels,
  DialogDataOperations,
  DialogDataTitles,
} from 'src/app/shared/constants/dialog.constants';

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

  constructor(
    private router: Router,
    private store: Store,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
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

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.position = { top: '5%' };
    dialogConfig.panelClass = 'dialog-container';
    dialogConfig.data = {
      title: DialogDataTitles.board,
      operation: DialogDataOperations.create,
      label: DialogDataLabels.board,
    };

    this.dialog.open(CreateBoardDialogComponent, dialogConfig);
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
