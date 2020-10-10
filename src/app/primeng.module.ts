import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    BrowserModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    SidebarModule,
    MenuModule,
  ]
})
export class PrimengModule { }
