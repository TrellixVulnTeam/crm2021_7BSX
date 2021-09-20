import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clientes } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  datos_contacto : Clientes[] = [];
  datos_usuario_cliente: Clientes[] = [];
  usuarios_disponibles: Clientes[] = [];
  datos_cliente : Clientes = new Clientes();

  form_agregar_usuario: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private clienteService : ClientesService, private _snackBar: MatSnackBar,) {
    this.form_agregar_usuario = new FormGroup({
      'cliente': new FormControl('',[Validators.required]),
      'usuario': new FormControl('',[Validators.required]),
    });
   }

  ngOnInit(): void {

    this.datos_contacto = this.data.datos_contacto;
    this.datos_usuario_cliente = this.data.datos_usuario_cliente;
    this.usuarios_disponibles = this.data.usuarios_disponibles;
    this.datos_cliente = this.data.datos_cliente;


  }


  agregarUsuarioCompartido(){
    let datos : Clientes = new Clientes();

    datos = this.form_agregar_usuario.value;

    this.clienteService.guardarUsuario(datos).subscribe(
      response => {
        //this.usuarios_disponibles = response;
      },
      err => {
        this._snackBar.open('¡¡ Error !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      },
      () => {

        this._snackBar.open('¡¡ Datos Guardados !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this.getUsuarioDisponibles();
        this.getUsuariosByCliente();
      });

  }


  getUsuariosByCliente(){
    this.clienteService.getUsuariosByCliente(this.datos_cliente).subscribe(
      response => {
        this.datos_usuario_cliente = response;
      },
      err => {

      },
      () => {
      });
  }


  getUsuarioDisponibles(){
    this.clienteService.getUsuariosDisponibles(this.datos_cliente).subscribe(
      response => {
        this.usuarios_disponibles = response;
      },
      err => {

      },
      () => {

      });
  }

  eliminarUsuario(idUsuario : any){
    let datos : Clientes = new Clientes();
    datos.idUsuario = idUsuario;
    datos.id = this.datos_cliente.id;

    this.clienteService.eliminarUsuario(datos).subscribe(
      response => {
        //this.usuarios_disponibles = response;
      },
      err => {
        this._snackBar.open('¡¡ Error !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      },
      () => {
          this._snackBar.open('¡¡ Datos Guardados !!', 'Ok', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.getUsuarioDisponibles();
          this.getUsuariosByCliente();
      }
      );
    }
}
