import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { Usuario } from 'src/app/models/usuario';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-nuevo-contacto',
  templateUrl: './nuevo-contacto.component.html',
  styleUrls: ['./nuevo-contacto.component.css']
})
export class NuevoContactoComponent implements OnInit {

  datos_cliente : Clientes = new Clientes();
  form_contacto: FormGroup;
  datos_contacto : Clientes[] | undefined;
  datos_cont: Clientes = new Clientes;
  user: Usuario = new Usuario();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,
  private clienteService : ClientesService, private _snackBar: MatSnackBar,public dialog: MatDialog) {
    this.form_contacto = new FormGroup({
      'codigo': new FormControl('',[Validators.required]),
      'nombre': new FormControl('',[Validators.required]),
      'cargo': new FormControl('',[Validators.required]),
      'correo': new FormControl('',),
      'celular1': new FormControl('',),
      'telefono1': new FormControl('',),
      'usuario': new FormControl('',)


    });
   }

  ngOnInit(): void {
    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');

  }else{
    this.router.navigate(['login']);
  }

    this.datos_cliente = this.data.datos_cliente;
  }

  listarContactos(datos : any){
    this.clienteService.listarContactosByCliente_potenciales(datos).subscribe(
      response => {
        this.datos_contacto = response;

        this.clienteService.fillDatosContactos(response);

        this.clienteService._datoscontactos.subscribe(response => {
        });
      },
      err => {

      },
      () => {

      }
    );
  }


  agregarContacto(){
    let datos : Clientes = new Clientes();
    datos = this.form_contacto.value;

    this.clienteService.guardarContacto_prospectos(datos).subscribe(
      response => {
      },
      err => {
        this._snackBar.open('¡¡ Error !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      },
      () => {

        this.listarContactos(datos);
        this._snackBar.open('¡¡ Datos Guardados !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        //this.dialog.closeAll();

      });

  }



}
