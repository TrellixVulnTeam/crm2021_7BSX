import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtecnicasRoutingModule } from './otecnicas-routing.module';
import { OtecnicasComponent } from './otecnicas/otecnicas.component';
import { MatModuleModule } from 'src/app/mat-module.module';


@NgModule({
  declarations: [
    OtecnicasComponent
  ],
  imports: [
    CommonModule,
    OtecnicasRoutingModule,
    MatModuleModule
  ]
})
export class OtecnicasModule { }
