import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { MatModuleModule } from 'src/app/mat-module.module';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtencionesModule } from '../atenciones/atenciones.module';
import { DetallesClienteComponent } from './detalles-cliente/detalles-cliente.component';
import { NuevoContactoComponent } from './nuevo-contacto/nuevo-contacto.component';



@NgModule({
  declarations: [
    ClientesComponent,
    DetallesClienteComponent,
    NuevoContactoComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MatModuleModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    AtencionesModule
  ],
  exports:[
    DetallesClienteComponent,
  ]
})

export class ClientesModule { }
