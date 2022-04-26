import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreetingPageComponent } from './pages/greeting-page/greeting-page.component';
import { Page404Component } from './pages/page404/page404.component';

const routes: Routes = [
  {
    path: '',
    component: Page404Component,
  },
  {
    path: 'greeting',
    component: GreetingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
