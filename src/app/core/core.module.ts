import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CoreRoutingModule } from './core-routing.module';
import { GreetingPageComponent } from './pages/greeting-page/greeting-page.component';
import { Page404Component } from './pages/page404/page404.component';

@NgModule({
  declarations: [GreetingPageComponent, HeaderComponent, FooterComponent, Page404Component],
  imports: [CommonModule, CoreRoutingModule, SharedModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
