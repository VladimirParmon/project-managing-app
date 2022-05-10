import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from 'src/app/shared/components/create-board-dialog/create-board-dialog.component';
import { Router } from '@angular/router';
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
export class HeaderComponent {
  constructor(public dialog: MatDialog, private http: HttpClient, private router: Router) {}

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
}
