import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MainPageComponent, BoardPageComponent],
  imports: [CommonModule, BoardRoutingModule, SharedModule, TranslateModule.forChild()],
})
export class BoardModule {}
