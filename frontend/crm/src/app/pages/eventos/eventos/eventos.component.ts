import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Archivos } from 'src/app/models/archivos';
import { Atenciones } from 'src/app/models/atenciones';
import { Eventos } from 'src/app/models/eventos';
import { Tickets } from 'src/app/models/tickets';
import { Usuario } from 'src/app/models/usuario';
import { ArchivosService } from 'src/app/services/archivos.service';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { EventosService } from 'src/app/services/eventos.service';
import { GlobalService } from 'src/app/services/global.service';
import { DetallesComponent } from '../../atenciones/detalles/detalles.component';
import { ModalTicketComponent } from '../../tickets/modal-ticket/modal-ticket.component';
import { DetallesEventosComponent } from '../detalles-eventos/detalles-eventos.component';
import { ResolucionEventoComponent } from '../resolucion-evento/resolucion-evento.component';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  user: Usuario = new Usuario();
  texto:any;
  texto1:any;
  texto2:any;
  texto3:any;
  displayedColumns: string[] = ['id',  'atencion_id', 'cliente' , 'usuario_creacion', 'titulo','fecha_creacionD','fecha_compromisoF', 'estado', 'Acciones'];
  dataSource_evtTodos:any = new MatTableDataSource<any>([]);
  dataSource_evtAbiertos:any = new MatTableDataSource<any>([]);
  dataSource_evtProResolucion:any = new MatTableDataSource<any>([]);
  dataSource_evtCerrados:any = new MatTableDataSource<any>([]);
  adjuntos: Archivos[] = [];
  ticketsPendientes : Tickets[] = [];
  datos_atn: Atenciones[] = [];

  @ViewChild('paginator1') paginator1: MatPaginator | undefined;
  @ViewChild('paginator2') paginator2: MatPaginator | undefined;
  @ViewChild('paginator3') paginator3: MatPaginator | undefined;
  @ViewChild('paginator4') paginator4: MatPaginator | undefined;

  //gestiones comerciales

  dataSource_evtTodosgc:any = new MatTableDataSource<any>([]);
  dataSource_evtAbiertosgc:any = new MatTableDataSource<any>([]);
  dataSource_evtProResoluciongc:any = new MatTableDataSource<any>([]);
  dataSource_evtCerradosgc:any = new MatTableDataSource<any>([]);

  @ViewChild('paginator1gc') paginator1gc: MatPaginator | undefined;
  @ViewChild('paginator2gc') paginator2gc: MatPaginator | undefined;
  @ViewChild('paginator3gc') paginator3gc: MatPaginator | undefined;
  @ViewChild('paginator4gc') paginator4gc: MatPaginator | undefined;
  textogc:any;
  texto1gc:any;
  texto2gc:any;
  texto3gc:any;

  constructor( private global: GlobalService, private router: Router, private eventosService: EventosService,
    public dialog: MatDialog, private atencionService: AtencionesService, private adjuntoService: ArchivosService,) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.global.fillOpcionMenu('Macrotarea');
    });


    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');
      setTimeout(() => {
        this.global.fillOpcionMenu('Macrotarea');
      });

    }else{
      this.router.navigate(['login']);
    }


  }



  ngAfterViewInit() {


    this.dataSource_evtTodos.paginator = this.paginator1;
    this.dataSource_evtAbiertos.paginator = this.paginator2;
    this.dataSource_evtProResolucion.paginator = this.paginator3;
    this.dataSource_evtCerrados.paginator = this.paginator4;

    this.dataSource_evtTodosgc.paginator = this.paginator1gc;
    this.dataSource_evtAbiertosgc.paginator= this.paginator2gc;
    this.dataSource_evtProResoluciongc.paginator = this.paginator3gc;
    this.dataSource_evtCerradosgc.paginator = this.paginator4gc;

    this.getAllEventos();
    this.getAllEventosgc();
  }


  getAllEventos(){

    this.eventosService.getAllEventos(this.user).subscribe(
      data => {

        //llenando arreglos
        this.dataSource_evtTodos.data = data;

        data.forEach((element: any) => {
          if(element["estado"]==='Abierto'){
            this.dataSource_evtAbiertos.data.push(element);
          }
        });

        data.forEach((element: any) => {
          if(element["estado"]==='Proceso de resolucion'){
            this.dataSource_evtProResolucion.data.push(element);
          }
        });

        data.forEach((element: any) => {
          if(element["estado"]==='Cerrado'){
            this.dataSource_evtCerrados.data.push(element);
          }
        });

        //llenando behaviour subject
        this.eventosService.fillevtTodos_list(this.dataSource_evtTodos.data);
        this.eventosService.fillevtAbiertos_list(this.dataSource_evtAbiertos.data);
        this.eventosService.fillevtProResolucion_list(this.dataSource_evtProResolucion.data);
        this.eventosService.fillevtCerrados_list(this.dataSource_evtCerrados.data);

        //suscribiendose a arreglo para llenar tabla
        this.eventosService._datos_evtTodos.subscribe(response => {
          this.dataSource_evtTodos.data = response;
        });

        this.eventosService._datos_evtAbiertos.subscribe(response => {
          this.dataSource_evtAbiertos.data = response;
        });

        this.eventosService._datos_evtProResolucion.subscribe(response => {
          this.dataSource_evtProResolucion.data = response;
        });

        this.eventosService._datos_evtCerrados.subscribe(response => {
          this.dataSource_evtCerrados.data = response;
        });
      });

  }


  getAllEventosgc(){

    this.eventosService.getAllEventosGC(this.user).subscribe(
      data => {

        //llenando arreglos
        this.dataSource_evtTodosgc.data = data;

        data.forEach((element: any) => {
          if(element["estado"]==='Abierto'){
            this.dataSource_evtAbiertosgc.data.push(element);
          }
        });

        data.forEach((element: any) => {
          if(element["estado"]==='Proceso de resolucion'){
            this.dataSource_evtProResoluciongc.data.push(element);
          }
        });

        data.forEach((element: any) => {
          if(element["estado"]==='Cerrado'){
            this.dataSource_evtCerradosgc.data.push(element);
          }
        });

        //llenando behaviour subject
        this.eventosService.fillevtTodos_listgc(this.dataSource_evtTodosgc.data);
        this.eventosService.fillevtAbiertos_listgc(this.dataSource_evtAbiertosgc.data);
        this.eventosService.fillevtProResolucion_listgc(this.dataSource_evtProResoluciongc.data);
        this.eventosService.fillevtCerrados_listgc(this.dataSource_evtCerradosgc.data);

        //suscribiendose a arreglo para llenar tabla
        this.eventosService._datos_evtTodosgc.subscribe(response => {
          this.dataSource_evtTodosgc.data = response;
        });

        this.eventosService._datos_evtAbiertosgc.subscribe(response => {
          this.dataSource_evtAbiertosgc.data = response;
        });

        this.eventosService._datos_evtProResoluciongc.subscribe(response => {
          this.dataSource_evtProResoluciongc.data = response;
        });

        this.eventosService._datos_evtCerradosgc.subscribe(response => {
          this.dataSource_evtCerradosgc.data = response;
        });
      });

  }

  filterTable_evtTodos (filterValue :string) {
    this.dataSource_evtTodos.filter = filterValue.trim().toLowerCase();
 }

 filterTable_evtAbiertos (filterValue :string) {
  this.dataSource_evtAbiertos.filter = filterValue.trim().toLowerCase();
}


filterTable_evtProResolucion(filterValue :string) {
  this.dataSource_evtProResolucion.filter = filterValue.trim().toLowerCase();
}


filterTable_evtCerrados(filterValue :string) {
  this.dataSource_evtCerrados.filter = filterValue.trim().toLowerCase();
}


  filterTable_evtTodosgc (filterValue :string) {
    this.dataSource_evtTodosgc.filter = filterValue.trim().toLowerCase();
 }

 filterTable_evtAbiertosgc (filterValue :string) {
  this.dataSource_evtAbiertosgc.filter = filterValue.trim().toLowerCase();
}


filterTable_evtProResoluciongc(filterValue :string) {
  this.dataSource_evtProResoluciongc.filter = filterValue.trim().toLowerCase();
}


filterTable_evtCerradosgc(filterValue :string) {
  this.dataSource_evtCerradosgc.filter = filterValue.trim().toLowerCase();
}



generarTicket(eve: Eventos){
  this.dialog.open(ModalTicketComponent,{
    data: {datos_evento: eve},
    width: '80%',
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



resolucionEvento(evento: Eventos){
  this.dialog.open(ResolucionEventoComponent,{
    data: {detalle_evento: evento},
    width: '70%',
  });
}


imprimirDoc(evento: Eventos){
  const ur =  this.global.getUrlBackEnd() + 'imprimir_carta?id_evento=' + evento.id+'&id_atencion='+evento.atencion_id+'&nis='+evento.num_suministro;
  window.open(ur, '_blank');
}

}
