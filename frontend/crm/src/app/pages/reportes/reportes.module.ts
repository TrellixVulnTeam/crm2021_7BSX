import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes/reportes.component';
import { MatModuleModule } from 'src/app/mat-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistorialClienteComponent } from './historial-cliente/historial-cliente.component';


@NgModule({
  declarations: [
    ReportesComponent,
    HistorialClienteComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    MatModuleModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ReportesModule { }
