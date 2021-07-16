import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuministrosRoutingModule } from './suministros-routing.module';
import { SuministrosComponent } from './suministros/suministros.component';


@NgModule({
  declarations: [
    SuministrosComponent
  ],
  imports: [
    CommonModule,
    SuministrosRoutingModule
  ]
})
export class SuministrosModule { }
