import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UrlPaths } from '../shared/constants/url-paths';
import { GreetingPageComponent } from './pages/greeting-page/greeting-page.component';
import { Page404Component } from './pages/page404/page404.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: UrlPaths.greeting,
    pathMatch: 'full',
  },
  {
    path: UrlPaths.greeting,
    component: GreetingPageComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: UrlPaths.notFound,
    component: Page404Component,
  },
  {
    path: UrlPaths.notFoundPattern,
    redirectTo: UrlPaths.notFound,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
