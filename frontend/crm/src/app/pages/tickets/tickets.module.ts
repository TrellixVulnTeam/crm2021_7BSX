import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets/tickets.component';
import { MatModuleModule } from 'src/app/mat-module.module';
import { ModalTicketComponent } from './modal-ticket/modal-ticket.component';


@NgModule({
  declarations: [
    TicketsComponent,
    ModalTicketComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MatModuleModule
  ],
  exports:[
    ModalTicketComponent
  ]
})
export class TicketsModule { }
