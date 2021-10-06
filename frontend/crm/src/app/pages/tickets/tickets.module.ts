import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { MatModuleModule } from 'src/app/mat-module.module';
import { ModalTicketComponent } from './modal-ticket/modal-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetallesTicketsComponent } from './detalles-tickets/detalles-tickets.component';
import { TicketsAsociadosComponent } from './tickets-asociados/tickets-asociados.component';



@NgModule({
  declarations: [
    TicketsComponent,
    ModalTicketComponent,
    DetallesTicketsComponent,
    TicketsAsociadosComponent,
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MatModuleModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    ModalTicketComponent
  ]
})
export class TicketsModule { }
