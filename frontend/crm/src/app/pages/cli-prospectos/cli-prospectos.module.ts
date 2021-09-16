import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CliProspectosRoutingModule } from './cli-prospectos-routing.module';
import { CliProspectosComponent } from './cli-prospectos/cli-prospectos.component';
import { MatModuleModule } from 'src/app/mat-module.module';
import { AtencionesModule } from '../atenciones/atenciones.module';



@NgModule({
  declarations: [
    CliProspectosComponent,
  ],
  imports: [
    CommonModule,
    CliProspectosRoutingModule,
    MatModuleModule,
    AtencionesModule
  ]
})
export class CliProspectosModule { }
