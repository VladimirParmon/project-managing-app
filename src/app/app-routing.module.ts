import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPaths } from './shared/constants/url-paths';

const routes: Routes = [
  {
    path: '',
    redirectTo: UrlPaths.greeting,
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    path: UrlPaths.board,
    loadChildren: () => import('./board/board.module').then((m) => m.BoardModule),
  },
  {
    path: UrlPaths.auth,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
