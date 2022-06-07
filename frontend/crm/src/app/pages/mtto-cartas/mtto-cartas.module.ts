import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MttoCartasRoutingModule } from './mtto-cartas-routing.module';
import { MttoCartasComponent } from './mtto-cartas/mtto-cartas.component';
import { MatModuleModule } from 'src/app/mat-module.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MttoCartasComponent
  ],
  imports: [
    CommonModule,
    MttoCartasRoutingModule,
    MatModuleModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MttoCartasModule { }
