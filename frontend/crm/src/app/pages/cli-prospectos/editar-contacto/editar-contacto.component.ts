import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clientes } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-editar-contacto',
  templateUrl: './editar-contacto.component.html',
  styleUrls: ['./editar-contacto.component.css']
})
export class EditarContactoComponent implements OnInit {

  datos_cliente : Clientes = new Clientes();
  form_contacto: FormGroup;
  datos_contacto : Clientes[] | undefined;
  datos_cont: Clientes = new Clientes;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private clienteService : ClientesService, private _snackBar: MatSnackBar,public dialog: MatDialog) {
    this.form_contacto = new FormGroup({
      'codigo': new FormControl('',[Validators.required]),
      'nombre': new FormControl('',[Validators.required]),
      'cargo': new FormControl('',[Validators.required]),
      'correo': new FormControl('',),
      'celular1': new FormControl('',),
      'telefono1': new FormControl('',)

    });
   }


   ngOnInit(): void {
    this.datos_cliente = this.data.datos_cliente;
    this.datos_cont = this.data.datos_contacto;
  }

  editarContacto(){

  }

}
