import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotivoAtencionesRoutingModule } from './motivo-atenciones-routing.module';
import { MotivoAtencionesComponent } from './motivo-atenciones/motivo-atenciones.component';

import { MatModuleModule } from 'src/app/mat-module.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    MotivoAtencionesComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    MotivoAtencionesRoutingModule,
    CommonModule,
    MatModuleModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MotivoAtencionesModule { }
