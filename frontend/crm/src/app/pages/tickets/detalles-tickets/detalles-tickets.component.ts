import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Eventos } from 'src/app/models/eventos';
import { Tickets } from 'src/app/models/tickets';
import { Usuario } from 'src/app/models/usuario';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { EventosService } from 'src/app/services/eventos.service';
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

  constructor( public modal_evento: MatDialogRef<DetallesTicketsComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private router: Router, private _snackBar: MatSnackBar,private atencionService: AtencionesService, private eventosService: EventosService,
  public dialog: MatDialog) {
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
      'solicitante': new FormControl('')
    });
  }

  ngOnInit(): void {


    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');

      this.detalles_ticket = this.data.detalles_ticket;


      }else{
        this.router.navigate(['login']);
      }
  }


  verDetalleEvento(){
    let evento : any;
    evento = this.detalles_ticket;

    this.eventosService.getDetalleEvento(evento).subscribe(
      data=>{
        this.dialog.open(DetallesEventosComponent,{
          data: {datos_evento: data},
          width: '80%',
        });
      }
    );

  }


  verDetalleAtencion(){
    let atencion : any;
    atencion = this.detalles_ticket;
    this.atencionService.getDetalleAtencion(atencion).subscribe(
      data=>{
        this.dialog.open(DetallesComponent,{
          data: {datos_atencion: data},
          width: '80%',
        });
      }
    );
  }
}
