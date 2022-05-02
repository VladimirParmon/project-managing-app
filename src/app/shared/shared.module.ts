import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatToolbarModule, FormsModule],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, FormsModule],
})
export class SharedModule {}
