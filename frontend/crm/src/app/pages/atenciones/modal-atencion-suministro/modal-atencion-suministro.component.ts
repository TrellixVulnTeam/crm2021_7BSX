import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Atenciones } from 'src/app/models/atenciones';
import { Clientes } from 'src/app/models/clientes';
import { Suministros } from 'src/app/models/suministros';
import { Usuario } from 'src/app/models/usuario';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-modal-atencion-suministro',
  templateUrl: './modal-atencion-suministro.component.html',
  styleUrls: ['./modal-atencion-suministro.component.css']
})
export class ModalAtencionSuministroComponent implements OnInit {

  datos_contacto : Clientes[] = [];
  datos_suministro : Clientes[] = [];
  list_motivo_atenciones : Atenciones[] = [];
  list_tipo_atenciones : Atenciones[] = [];
  form_atencion : FormGroup;

  datos_cliente : Suministros = new Suministros();
  tipo_atencion = '';
  user: Usuario = new Usuario();
  arreglo_atenciones: Atenciones = new Atenciones();
  atencion_id : Atenciones = new Atenciones()
  tipo = 'atencion';


  constructor(public atencionService: AtencionesService,
    public modal_atencion: MatDialogRef<ModalAtencionSuministroComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, private _snackBar: MatSnackBar, private clienteService : ClientesService) {
    this.form_atencion = new FormGroup({
      'codigo': new FormControl(''),
      'suministro': new FormControl(''),
      'cliente': new FormControl('',[Validators.required]),
      'contacto': new FormControl(''),
      'telefono': new FormControl(''),
      'tipo_atencion': new FormControl('',[Validators.required]),
      'motivo_atencion': new FormControl('',[Validators.required]),
      'titulo_atn': new FormControl('',[Validators.required]),
      'descripcion_atencion': new FormControl(''),
      'email' : new FormControl(''),
      'fax' : new FormControl(''),
      'whatsapp' : new FormControl(''),
      'usuario_crm' : new FormControl(''),
    });
  }

  ngOnInit(): void {

    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');

      }else{
        this.router.navigate(['login']);
      }


    this.atencionService.getMotivosAtenciones().subscribe(
      data => {
        this.list_motivo_atenciones = data;
      });


      this.atencionService.getTiposAtenciones().subscribe(
        data => {
          this.list_tipo_atenciones = data;
        })

        this.datos_cliente = this.data.datos_cliente;
        this.datos_suministro = this.data.datos_suministro;



  }


  mostrarDatos(){
    var opcion = this.form_atencion.controls["tipo_atencion"].value;

    if(opcion === '2'){
      this.tipo_atencion = 'email';
      this.form_atencion.controls["email"].setValue('');
    }

    else if(opcion === '5'){
      this.tipo_atencion = 'fax';
      this.form_atencion.controls["fax"].setValue('');
    }

    else if(opcion === '7'){
      this.tipo_atencion = 'whatsapp';
      this.form_atencion.controls["whatsapp"].setValue('');
    }else{
      this.tipo_atencion = '';
    }
  }



  guardarAtencion(){
    let datos : Atenciones = new Atenciones();

    datos = this.form_atencion.value;

    this.arreglo_atenciones = datos;


    this.atencionService.guardarAtencion(this.arreglo_atenciones).subscribe(
      response => {
        this.atencion_id = response;

      },
      err => {

      },
      () => {
        this._snackBar.open('¡¡ Datos Guardados !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      });
  }

}
