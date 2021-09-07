import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtencionesRoutingModule } from './atenciones-routing.module';
import { AtencionesComponent } from './atenciones/atenciones.component';
import { MatModuleModule } from 'src/app/mat-module.module';


@NgModule({
  declarations: [
    AtencionesComponent
  ],
  imports: [
    CommonModule,
    AtencionesRoutingModule,
    MatModuleModule
  ]
})
export class AtencionesModule { }
