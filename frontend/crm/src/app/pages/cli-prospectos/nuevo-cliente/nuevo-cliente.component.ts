import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { Usuario } from 'src/app/models/usuario';
import { ClientesService } from 'src/app/services/clientes.service';
import { NuevoContactoComponent } from '../nuevo-contacto/nuevo-contacto.component';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  datos_contacto_cli : Clientes[] = [];
  datos_usuario_cliente: Clientes[] = [];
  usuarios_disponibles: Clientes[] = [];
  dataSource:any = new MatTableDataSource<any>([]);
  datos_cliente : Clientes = new Clientes();
  user: Usuario = new Usuario();
  form_agregar_usuario: FormGroup;
  frm_cliente: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,
  private clienteService : ClientesService, private _snackBar: MatSnackBar,public dialog: MatDialog) {
    this.form_agregar_usuario = new FormGroup({
      'cliente': new FormControl('',[Validators.required]),
      'usuario': new FormControl('',[Validators.required]),
    });


    this.frm_cliente = new FormGroup({
      'codigo': new FormControl(''),
      'porcentaje_costo_energia': new FormControl(''),
      'facturacion_mensual': new FormControl(''),
      'margen_rentabilidad': new FormControl(''),
      'horas_produccion': new FormControl(''),
      'empresa': new FormControl(''),
      'direccion': new FormControl(''),
      'rubro': new FormControl(''),
      'pbx': new FormControl(''),
      'tension_servicio': new FormControl(''),
      'fases': new FormControl(''),
      'hilos': new FormControl(''),
      'uso_servicio': new FormControl(''),
      'tarifa': new FormControl(''),
      'potencia': new FormControl(''),
      'sub_propiedad': new FormControl(''),
      'sub_ubicacion': new FormControl(''),
      'sub_kva_instalados': new FormControl(''),
      'sub_transformadores_req': new FormControl(''),
      'sub_conexion': new FormControl(''),
      'sub_montaje': new FormControl(''),
      'turnos_produccion': new FormControl(''),
      'conexion_num_cortes': new FormControl(''),
      'fecha_visita': new FormControl(''),
      'compromisos': new FormControl(''),
      'categoria' : new FormControl('')
    });
   }

  ngOnInit(): void {
  }

  agregarUsuarioCompartido(){

  }

  eliminarUsuario(idUsuario : any){

    }


  editarContacto(datos: Clientes){

  }


  eliminarContacto(datos: Clientes){


  }


  guardarInformacion(){


  }


  open_modal_contacto(){
    this.dialog.open(NuevoContactoComponent,{
      width: '80%',
    });
  }

}
