import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule
  ]
})
export class PrimengModule { }
