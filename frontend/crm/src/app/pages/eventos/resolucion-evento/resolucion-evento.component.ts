import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Eventos } from 'src/app/models/eventos';
import { Tickets } from 'src/app/models/tickets';
import { Usuario } from 'src/app/models/usuario';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-resolucion-evento',
  templateUrl: './resolucion-evento.component.html',
  styleUrls: ['./resolucion-evento.component.css']
})
export class ResolucionEventoComponent implements OnInit {
  frm_resolucion_evt: FormGroup;
  ticketsPendientes : Tickets[] = [];
  detalle_evento: Eventos = new Eventos();
  no_tickets!: any;
  si_tickets!: any;
  dataSource_evtTodos:any = new MatTableDataSource<any>([]);
  dataSource_evtAbiertos:any = new MatTableDataSource<any>([]);
  dataSource_evtProResolucion:any = new MatTableDataSource<any>([]);
  dataSource_evtCerrados:any = new MatTableDataSource<any>([]);
  user: Usuario = new Usuario();

  constructor(public modal: MatDialogRef<ResolucionEventoComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private eventoService: EventosService, private _snackBar: MatSnackBar) {
    this.frm_resolucion_evt = new FormGroup({
      'resolucion_evt': new FormControl('',[Validators.required]),
      'evt_id': new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    //this.ticketsPendientes = this.data.ticketsPendientes;
    this.detalle_evento = this.data.detalle_evento;


    this.eventoService.getTicketsPendientes(this.detalle_evento).subscribe(
      (      data: Tickets[]) => {
        this.ticketsPendientes = data;
        if(this.ticketsPendientes.length === 0){
          this.si_tickets = false;
          this.no_tickets = true;
        }else{
          this.si_tickets = true;
          this.no_tickets = false;
        }
      }
    );

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');



  }


  guardarResolucion(){
    let datos : Eventos = new Eventos();
    datos = this.frm_resolucion_evt.value;

    this.eventoService.guardarResolucion(datos).subscribe(
      data =>{

      },
      err => {

      },
      () => {
        this._snackBar.open('¡¡ Resolución Guardada !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.modal.close();
        this.getAllEventos();
      });

  }


  getAllEventos(){

    this.eventoService.getAllEventos(this.user).subscribe(
      (      data: any[]) => {

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
        this.eventoService.fillevtTodos_list(this.dataSource_evtTodos.data);
        this.eventoService.fillevtAbiertos_list(this.dataSource_evtAbiertos.data);
        this.eventoService.fillevtProResolucion_list(this.dataSource_evtProResolucion.data);
        this.eventoService.fillevtCerrados_list(this.dataSource_evtCerrados.data);

        //suscribiendose a arreglo para llenar tabla
        this.eventoService._datos_evtTodos.subscribe((response: any) => {
          this.dataSource_evtTodos.data = response;
        });

        this.eventoService._datos_evtAbiertos.subscribe((response: any) => {
          this.dataSource_evtAbiertos.data = response;
        });

        this.eventoService._datos_evtProResolucion.subscribe((response: any) => {
          this.dataSource_evtProResolucion.data = response;
        });

        this.eventoService._datos_evtCerrados.subscribe((response: any) => {
          this.dataSource_evtCerrados.data = response;
        });
      });

  }

}
