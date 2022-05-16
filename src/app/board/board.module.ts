import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardRoutingModule } from './board-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { HorizontalScrollDirective } from './directives/horizontal-scroll.directive';
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component';

@NgModule({
  declarations: [
    MainPageComponent,
    BoardPageComponent,
    HorizontalScrollDirective,
    CreateTaskDialogComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    SharedModule,
    TranslateModule.forChild(),
    DragDropModule,
  ],
})
export class BoardModule {}
