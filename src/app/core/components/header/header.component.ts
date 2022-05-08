import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UrlPaths } from 'src/app/shared/constants/url-paths';

@Component({
  selector: 'ma-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  goToAuth(): void {
    this.router.navigate([UrlPaths.auth, UrlPaths.login]);
  }
}
