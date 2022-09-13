import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Atenciones } from 'src/app/models/atenciones';
import { Eventos } from 'src/app/models/eventos';
import { Tickets } from 'src/app/models/tickets';
import { EventosService } from 'src/app/services/eventos.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { DetallesEventosComponent } from '../../eventos/detalles-eventos/detalles-eventos.component';
import { EventosAsociadosComponent } from '../../eventos/eventos-asociados/eventos-asociados.component';
import { DetallesTicketsComponent } from '../detalles-tickets/detalles-tickets.component';

@Component({
  selector: 'app-tickets-asociados',
  templateUrl: './tickets-asociados.component.html',
  styleUrls: ['./tickets-asociados.component.css']
})
export class TicketsAsociadosComponent implements OnInit {

  datos_evento: Eventos = new Eventos();
  datos_atencion: Atenciones = new Atenciones();
  datos_ticket: Tickets[] = [];
  validar_btn: any;

  constructor( public modal_ticket: MatDialogRef<TicketsAsociadosComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog, private eventosService: EventosService, private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.datos_evento = this.data.datos_evento;
    this.datos_atencion = this.data.datos_atencion;
    this.datos_ticket = this.data.datos_ticket;
    this.validar_btn = this.data.validar_btn;
  }


  volverListadoEventos(){
    this.modal_ticket.close();

    let evento: any;
    evento = this.datos_atencion;

    this.eventosService.getEventosAsociados(evento).subscribe(

      data=>{
        this.dialog.open(EventosAsociadosComponent,{
          data: {datos_evento: data, datos_atencion: this.datos_atencion},
          width: '60%',
        });
      }
    );


  }

  volverEvento(){
    this.modal_ticket.close();

  }





  verDetalleTicket(ticket: Tickets){

    let datos : Tickets = new Tickets();
    datos.id = ticket.id;

    this.ticketService.getDetalleTicketEvt(ticket).subscribe(
      data=>{

        this.dialog.open(DetallesTicketsComponent,{
          data: {detalles_ticket: data},
          width: '80%',
        });
      });


  }


}
