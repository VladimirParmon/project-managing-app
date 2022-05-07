import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LanguageSwitchComponent } from './components/language-switch/language-switch.component';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderScrollDirective } from './directives/header-scroll.directive';
import { GreetingPageComponent } from './pages/greeting-page/greeting-page.component';
import { Page404Component } from './pages/page404/page404.component';

@NgModule({
  declarations: [
    GreetingPageComponent,
    HeaderComponent,
    FooterComponent,
    Page404Component,
    HeaderScrollDirective,
    LanguageSwitchComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
    HttpClientModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
