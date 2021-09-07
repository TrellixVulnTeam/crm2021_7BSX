import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuministrosRoutingModule } from './suministros-routing.module';
import { SuministrosComponent } from './suministros/suministros.component';
import { MatModuleModule } from 'src/app/mat-module.module';


@NgModule({
  declarations: [
    SuministrosComponent
  ],
  imports: [
    CommonModule,
    SuministrosRoutingModule,
    MatModuleModule
  ]
})
export class SuministrosModule { }
