import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtencionesRoutingModule } from './atenciones-routing.module';
import { AtencionesComponent } from './atenciones/atenciones.component';
import { MatModuleModule } from 'src/app/mat-module.module';
import { ModalAtencionComponent } from './modal-atencion/modal-atencion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubirArchivosComponent } from './subir-archivos/subir-archivos.component';
import { ModalAtencionSuministroComponent } from './modal-atencion-suministro/modal-atencion-suministro.component';
import { DetallesComponent } from './detalles/detalles.component';
import { VerArchivosComponent } from './ver-archivos/ver-archivos.component';
import { CerrarAtencionComponent } from './cerrar-atencion/cerrar-atencion.component';
import { GenerarEventoComponent } from './generar-evento/generar-evento.component';


@NgModule({
  declarations: [
    AtencionesComponent,
    ModalAtencionComponent,
    SubirArchivosComponent,
    ModalAtencionSuministroComponent,
    DetallesComponent,
    VerArchivosComponent,
    CerrarAtencionComponent,
    GenerarEventoComponent
  ],
  imports: [
    CommonModule,
    AtencionesRoutingModule,
    MatModuleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ModalAtencionComponent,
    ModalAtencionSuministroComponent,
  ]
})
export class AtencionesModule { }
