import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Archivos } from 'src/app/models/archivos';
import { Tickets } from 'src/app/models/tickets';
import { Usuario } from 'src/app/models/usuario';
import { ArchivosService } from 'src/app/services/archivos.service';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { EventosService } from 'src/app/services/eventos.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { DetallesComponent } from '../../atenciones/detalles/detalles.component';
import { DetallesEventosComponent } from '../../eventos/detalles-eventos/detalles-eventos.component';

@Component({
  selector: 'app-detalles-tickets',
  templateUrl: './detalles-tickets.component.html',
  styleUrls: ['./detalles-tickets.component.css']
})
export class DetallesTicketsComponent implements OnInit {
  form_ticket : FormGroup;
  detalles_ticket: Tickets = new Tickets();
  user: Usuario = new Usuario();
  adjuntos: Archivos[] = [];

  usuarios: Usuario[] = [];


  constructor( public modal_detalles: MatDialogRef<DetallesTicketsComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private router: Router, private _snackBar: MatSnackBar,private atencionService: AtencionesService, private eventosService: EventosService,
  public dialog: MatDialog, private adjuntoService: ArchivosService, public ticketService: TicketsService ) {
    this.form_ticket = new FormGroup({
      //'codigo': new FormControl(''),
      'id_evento': new FormControl(''),
      'titulo_tck': new FormControl(''),
      'asignado_tck': new FormControl(''),
      'copia_tck': new FormControl(''),
      'fechasolaproxD': new FormControl(''),
      'horaAproxD': new FormControl(''),
      'descripcion_tck': new FormControl(''),
      'asignado': new FormControl(''),
      'solicitante': new FormControl(''),
      'fechasolicitud': new FormControl(''),
      'estado': new FormControl(''),
    });
  }

  ngOnInit(): void {


    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');

      this.detalles_ticket = this.data.detalles_ticket;

      this.getNotificados();
      }else{
        this.router.navigate(['login']);
      }
  }


  verDetalleEvento(){
    let datos: any;
    datos = this.detalles_ticket;


    this.adjuntoService.getAdjuntosEventos(datos).subscribe(
      data=>{
        this.adjuntos = data;
      });


    this.eventosService.getDetalleEvento(datos).subscribe(
      data=>{
        this.dialog.open(DetallesEventosComponent,{
          data: {datos_evento: data, datos_adjuntos: this.adjuntos},
          width: '80%',
        });
      }
    );



  }


  verDetalleAtencion(){
    let atencion : any;
    atencion = this.detalles_ticket;


    this.adjuntoService.getAdjuntosAtencion(atencion).subscribe(
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


  getNotificados(){

    this.ticketService.getNotificados(this.detalles_ticket).subscribe(
      data =>{
        this.usuarios = data;
      },
      err=>{},
      ()=>{}
    );
  }

  cerrar(){
    this.modal_detalles.close()
  }
}
