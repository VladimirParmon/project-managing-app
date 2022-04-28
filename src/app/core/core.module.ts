import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { GreetingPageComponent } from './pages/greeting-page/greeting-page.component';
import { Page404Component } from './pages/page404/page404.component';

@NgModule({
  declarations: [GreetingPageComponent, Page404Component],
  imports: [CommonModule, CoreRoutingModule],
})
export class CoreModule {}
