import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Atenciones } from 'src/app/models/atenciones';
import { Eventos } from 'src/app/models/eventos';
import { Usuario } from 'src/app/models/usuario';
import { EventosService } from 'src/app/services/eventos.service';
import { GenerarTicketComponent } from '../generar-ticket/generar-ticket.component';

@Component({
  selector: 'app-modal-evento',
  templateUrl: './modal-evento.component.html',
  styleUrls: ['./modal-evento.component.css']
})
export class ModalEventoComponent implements OnInit {
  form_evento: FormGroup;
  datos_atencion: Atenciones = new Atenciones();
  user: Usuario = new Usuario();
  arreglo_evento: Eventos = new Eventos();
  evento_id : Eventos = new Eventos();
  tipo="evento";
  validarArchivosEv = false;

  constructor( public modal_evento: MatDialogRef<ModalEventoComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private router: Router, private eventosService: EventosService, private _snackBar: MatSnackBar,
  public dialog: MatDialog) {
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
    });
  }

  ngOnInit(): void {

    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');
      this.datos_atencion = this.data.datos_atencion;

    }else{
      this.router.navigate(['login']);
    }


  }

  guardarEvento(){
    let datos : Eventos = new Eventos();

    datos = this.form_evento.value;

    this.arreglo_evento = datos;


    this.eventosService.guardarEvento(this.arreglo_evento).subscribe(
      response => {
        this.evento_id = response;

        this._snackBar.open('¡¡ Evento Guardado !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });


        this.dialog.open(GenerarTicketComponent,{
          data:{
            evento_id: response, accion: 'adjuntaré archivos'
          }
        }
         );

         this.validarArchivosEv = true;
      },
      err => {

      },
      () => {

      });

  }

}
