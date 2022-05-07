import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { UrlPaths } from './shared/constants/url-paths';

const routes: Routes = [
  {
    path: UrlPaths.auth,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: UrlPaths.board,
    loadChildren: () => import('./board/board.module').then((m) => m.BoardModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
