import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtecnicasRoutingModule } from './otecnicas-routing.module';
import { OtecnicasComponent } from './otecnicas/otecnicas.component';


@NgModule({
  declarations: [
    OtecnicasComponent
  ],
  imports: [
    CommonModule,
    OtecnicasRoutingModule
  ]
})
export class OtecnicasModule { }
