import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { EventosComponent } from './eventos/eventos.component';
import { MatModuleModule } from 'src/app/mat-module.module';
import { ModalEventoComponent } from './modal-evento/modal-evento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtencionesModule } from '../atenciones/atenciones.module';
import { TicketsModule } from '../tickets/tickets.module';
import { DetallesEventosComponent } from './detalles-eventos/detalles-eventos.component';
import { EventosAsociadosComponent } from './eventos-asociados/eventos-asociados.component';
import { GenerarTicketComponent } from './generar-ticket/generar-ticket.component';
import { ResolucionEventoComponent } from './resolucion-evento/resolucion-evento.component';



@NgModule({
  declarations: [
    EventosComponent,
    ModalEventoComponent,
    DetallesEventosComponent,
    EventosAsociadosComponent,
    GenerarTicketComponent,
    ResolucionEventoComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    MatModuleModule,
    FormsModule,
    ReactiveFormsModule,
    AtencionesModule,
    TicketsModule
  ],
  exports:[
    ModalEventoComponent,
  ]
})
export class EventosModule { }
