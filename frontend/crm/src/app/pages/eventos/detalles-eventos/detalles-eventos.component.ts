import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Archivos } from 'src/app/models/archivos';
import { Eventos } from 'src/app/models/eventos';
import { Usuario } from 'src/app/models/usuario';
import { GlobalService } from 'src/app/services/global.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { VerArchivosComponent } from '../../atenciones/ver-archivos/ver-archivos.component';
import { TicketsAsociadosComponent } from '../../tickets/tickets-asociados/tickets-asociados.component';


@Component({
  selector: 'app-detalles-eventos',
  templateUrl: './detalles-eventos.component.html',
  styleUrls: ['./detalles-eventos.component.css']
})
export class DetallesEventosComponent implements OnInit {
  datos_adjuntos: Archivos[] = [];
  form_evento: FormGroup;
  user: Usuario = new Usuario();
  eventos_obj: Eventos = new Eventos();
  rutaFile!: string;
  tipo_persona_validar!: boolean;
  datos_repre : Eventos = new Eventos();


  constructor( public modal_evento: MatDialogRef<DetallesEventosComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private router: Router, private _snackBar: MatSnackBar,private url: GlobalService, public dialog: MatDialog,private ticketService: TicketsService) {
    this.form_evento = new FormGroup({
      //'codigo': new FormControl('',[Validators.required]),
      'suministro': new FormControl(''),
      'usuario_crm': new FormControl('',[Validators.required]),
      'cliente': new FormControl(''),
      'titulo_evt': new FormControl(''),
      'contacto': new FormControl('',[Validators.required]),
      'atencion_id': new FormControl('',[Validators.required]),
      'fecha_compromiso': new FormControl('',[Validators.required]),
      'hora_compromiso': new FormControl('',[Validators.required]),
      'fecha_resolucion' : new FormControl(''),
      'hora_resolucion' : new FormControl(''),
      'descripcion_evt' : new FormControl(''),
      'resolucion': new FormControl(''),
      'ap_nombre' : new FormControl(''),
      'ap_profesion' : new FormControl(''),
      'ap_dui' : new FormControl(''),
      'ap_nit' : new FormControl(''),
      'ap_domicilio' : new FormControl(''),
      'ap_actua' : new FormControl(''),
      'ap_departamento' : new FormControl(''),

    });
   }

  ngOnInit(): void {

    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');

      this.eventos_obj = this.data.datos_evento;
      this.datos_adjuntos = this.data.datos_adjuntos;
      this.rutaFile = this.url.getUrlBackEnd()+'descargarArchivo?ruta=';
      }else{
        this.router.navigate(['login']);
      }



    if(this.eventos_obj.ap_nombre === null){

      this.tipo_persona_validar = false;
    }else{

      this.tipo_persona_validar = true;
    }

  }


  Cerrar(){
    this.modal_evento.close();
  }


  verArchivo(adjunto: Archivos){
    this.dialog.open(VerArchivosComponent,{
      data: {archivo: adjunto},
      width: '80%',
    });
  }

  verTicketsAsociados(evento: Eventos){
    //this.modal_evento.close();

    let ticket : any;

    ticket = evento;
    this.ticketService.getTicketsAsociados(ticket).subscribe(
      data=>{
        this.dialog.open(TicketsAsociadosComponent,{
          data: {datos_evento: evento, datos_atencion: '', datos_ticket: data, validar_btn: 'Evento'},
          width: '80%',
        });
      }
    );
  }
}
