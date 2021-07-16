import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';

const matmodules = [
  MatSliderModule,
  MatCardModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    matmodules
  ]
})
export class MatModuleModule { }
