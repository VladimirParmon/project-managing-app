import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { HorizontalScrollDirective } from './directives/horizontal-scroll.directive';

@NgModule({
  declarations: [MainPageComponent, BoardPageComponent, HorizontalScrollDirective],
  imports: [CommonModule, BoardRoutingModule, SharedModule, TranslateModule.forChild()],
})
export class BoardModule {}
