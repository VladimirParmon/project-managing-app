import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, BoardRoutingModule],
})
export class BoardModule {}
