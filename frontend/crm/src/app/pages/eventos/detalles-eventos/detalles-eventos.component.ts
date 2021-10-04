import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Eventos } from 'src/app/models/eventos';
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-detalles-eventos',
  templateUrl: './detalles-eventos.component.html',
  styleUrls: ['./detalles-eventos.component.css']
})
export class DetallesEventosComponent implements OnInit {

  form_evento: FormGroup;
  user: Usuario = new Usuario();
  eventos_obj: Eventos[] = [];

  constructor( public modal_evento: MatDialogRef<DetallesEventosComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private router: Router, private _snackBar: MatSnackBar,) {
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

      this.eventos_obj = this.data.datos_evento;


      }else{
        this.router.navigate(['login']);
      }
  }

}
