import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Archivos } from 'src/app/models/archivos';
import { Atenciones } from 'src/app/models/atenciones';
import { Eventos } from 'src/app/models/eventos';
import { Otecnicas } from 'src/app/models/otecnicas';
import { Tickets } from 'src/app/models/tickets';
import { Usuario } from 'src/app/models/usuario';
import { ArchivosService } from 'src/app/services/archivos.service';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { EventosService } from 'src/app/services/eventos.service';
import { GlobalService } from 'src/app/services/global.service';
import { OtecnicasService } from 'src/app/services/otecnicas.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { DetallesComponent } from '../../atenciones/detalles/detalles.component';
import { DetallesEventosComponent } from '../../eventos/detalles-eventos/detalles-eventos.component';
import { DetallesTicketsComponent } from '../../tickets/detalles-tickets/detalles-tickets.component';
import { DetallesOtecnicasComponent } from '../detalles-otecnicas/detalles-otecnicas.component';

@Component({
  selector: 'app-otecnicas',
  templateUrl: './otecnicas.component.html',
  styleUrls: ['./otecnicas.component.css']
})
export class OtecnicasComponent implements OnInit {
  user: Usuario = new Usuario();
  texto:any;
  adjuntos: Archivos[] = [];

  datosAnuales: Otecnicas[] = [];
  displayedColumns: string[] = ['atencion_id', 'evento_id', 'ticket_id', 'id',  'solicitud', 'fecha_creacionD' , 'cliente', 'nombresolicitante',  'aprobTecnica', 'aprobVentas', 'aprobGg', 'aprobFf', 'aprobOc'];
  dataSource_ordenesTodas:any = new MatTableDataSource<any>([]);

  @ViewChild('paginator1') paginator1: MatPaginator | undefined;

  constructor( private global: GlobalService, private router: Router, private ordenesService: OtecnicasService,
    public dialog: MatDialog, private adjuntoService: ArchivosService, private atencionService: AtencionesService,
    private eventoService: EventosService, private ticketService: TicketsService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.global.fillOpcionMenu('Ordenes Técnicas CRM');
    });


    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');


    }else{
      this.router.navigate(['login']);
    }


  }


  getAllOrdenes(){
    this.ordenesService.getAllOrdenes().subscribe(
      data => {

        //llenando arreglos
        this.dataSource_ordenesTodas.data = data;
      });


      this.ordenesService.fillordenesTodas_list(this.dataSource_ordenesTodas.data);

      this.ordenesService._datos_ordenesTodas.subscribe(response => {
        this.dataSource_ordenesTodas.data = response;
      });
  }

  ngAfterViewInit() {
    this.dataSource_ordenesTodas.paginator = this.paginator1;
    this.getAllOrdenes();
  }



  filterTable_ordenesTodas(filterValue :string) {
    this.dataSource_ordenesTodas.filter = filterValue.trim().toLowerCase();
 }


 verDetalleOrden(datos: Otecnicas){

  this.ordenesService.getDatosAnualesOrden(datos).subscribe(
    data => {
      this.datosAnuales = data;
    },
    err=>{},
    ()=>{
      this.dialog.open(DetallesOtecnicasComponent,{
        disableClose: true ,
        data: {detalles_orden: datos, datos_anuales: this.datosAnuales},
        width: '80%',
      });
    }
    );


 }


 verDetalleEvento(evento: Eventos){
  let datos: any;
  datos = evento;

  this.adjuntoService.getAdjuntosEventos(datos).subscribe(
    data=>{
      this.adjuntos = data;

      this.eventoService.getDetalleEvento(datos).subscribe(
        data=>{
          this.dialog.open(DetallesEventosComponent,{

            data: {datos_evento: data, datos_adjuntos: this.adjuntos},
            width: '80%',
          });
        });

    });

}



verDetalleAtencion(atencion: Atenciones){


  let datos: any;
  datos = atencion;

  this.adjuntoService.getAdjuntosAtencion(datos).subscribe(
    data=>{
      this.adjuntos = data;
      this.atencionService.getDetalleAtencion(atencion).subscribe(
        data=>{
          this.dialog.open(DetallesComponent,{
            data: {datos_atencion: data, datos_adjuntos: this.adjuntos},
            width: '80%',
          });
        }
      );
    });
}

verDetalleTicket(ticket: Tickets){

  this.ticketService.getDetalleTicketOT(ticket).subscribe(
    data=>{

      this.dialog.open(DetallesTicketsComponent,{
        data: {detalles_ticket: data},
        width: '80%',
      });
    });


}

}
