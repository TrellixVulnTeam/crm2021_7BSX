import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Archivos } from 'src/app/models/archivos';
import { Atenciones } from 'src/app/models/atenciones';
import { Eventos } from 'src/app/models/eventos';
import { Tickets } from 'src/app/models/tickets';
import { ArchivosService } from 'src/app/services/archivos.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { DetallesComponent } from '../../atenciones/detalles/detalles.component';
import { TicketsAsociadosComponent } from '../../tickets/tickets-asociados/tickets-asociados.component';
import { DetallesEventosComponent } from '../detalles-eventos/detalles-eventos.component';

@Component({
  selector: 'app-eventos-asociados',
  templateUrl: './eventos-asociados.component.html',
  styleUrls: ['./eventos-asociados.component.css']
})
export class EventosAsociadosComponent implements OnInit {
  datos_atencion: Atenciones = new Atenciones();
  datos_evento: Eventos[] = [];
  adjuntos: Archivos[] = [];

  constructor( public modal_eventos_asociados: MatDialogRef<EventosAsociadosComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog, private ticketService: TicketsService,private adjuntoService: ArchivosService) { }

  ngOnInit(): void {

    this.datos_evento = this.data.datos_evento;
    this.datos_atencion =  this.data.datos_atencion;

  }


  volverAtencion(){
    this.modal_eventos_asociados.close();

    this.dialog.open(DetallesComponent,{
      data: { datos_atencion: this.datos_atencion},
      width: '80%',
    });
  }


  verDetalleEvento(evento: Eventos){

    let datos: any;
    datos = evento;

    this.adjuntoService.getAdjuntosEventos(datos).subscribe(
      data=>{
        this.adjuntos = data;
        this.dialog.open(DetallesEventosComponent,{
          data: {datos_evento: evento, datos_adjuntos: this.adjuntos},
          width: '80%',
        });
      });

  }


  verTicketsAsociados(evento: Eventos){
    this.modal_eventos_asociados.close();

    let ticket : any;

    ticket = evento;
    this.ticketService.getTicketsAsociados(ticket).subscribe(
      data=>{
        this.dialog.open(TicketsAsociadosComponent,{
          data: {datos_evento: evento, datos_atencion: this.datos_atencion, datos_ticket: data},
          width: '80%',
        });
      }
    );




  }
}
