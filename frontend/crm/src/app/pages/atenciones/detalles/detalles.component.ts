import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Atenciones } from 'src/app/models/atenciones';
import { Clientes } from 'src/app/models/clientes';
import { Usuario } from 'src/app/models/usuario';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  form_atencion : FormGroup;
  user: Usuario = new Usuario();

  list_motivo_atenciones : Atenciones[] = [];
  list_tipo_atenciones : Atenciones[] = [];
  tipo = 'atencion';
  tipo_atencion = '';
  arreglo_atenciones: Atenciones[] = [];
  atencion_id : Atenciones = new Atenciones()


  constructor(public atencionService: AtencionesService,
    public modal_atencion: MatDialogRef<DetallesComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, private _snackBar: MatSnackBar, private clienteService : ClientesService) {
    this.form_atencion = new FormGroup({
      'codigo': new FormControl('',[Validators.required]),
      'suministro': new FormControl(''),
      'cliente': new FormControl('',[Validators.required]),
      'contacto': new FormControl(''),
      'telefono': new FormControl(''),
      'tipo_atencion': new FormControl('',[Validators.required]),
      'motivo_atencion': new FormControl('',[Validators.required]),
      'titulo_atn': new FormControl('',[Validators.required]),
      'descripcion_atencion': new FormControl('',[Validators.required]),
      'email' : new FormControl(''),
      'fax' : new FormControl(''),
      'whatsapp' : new FormControl(''),
      'usuario_crm' : new FormControl(''),
      'estado': new FormControl(''),
      'nomUsuario' : new FormControl(''),
      'fecha_creacion': new FormControl(''),
    });
  }

  ngOnInit(): void {

    this.arreglo_atenciones = this.data.datos_atencion;

    console.log(this.arreglo_atenciones);

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
        });


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

  }

}
