import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { Usuario } from 'src/app/models/usuario';
import { ClientesService } from 'src/app/services/clientes.service';
import { EditarContactoComponent } from '../editar-contacto/editar-contacto.component';
import { NuevoContactoComponent } from '../nuevo-contacto/nuevo-contacto.component';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  datos_contacto_cli : Clientes[] = [];
  datos_usuario_cliente: Clientes[] = [];
  usuarios_disponibles: Clientes[] = [];
  dataSource:any = new MatTableDataSource<any>([]);
  datos_cliente : Clientes = new Clientes();
  user: Usuario = new Usuario();
  form_agregar_usuario: FormGroup;
  frm_cliente: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,
  private clienteService : ClientesService, private _snackBar: MatSnackBar,public dialog: MatDialog,) {
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

    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');


    }else{
      this.router.navigate(['login']);
    }


    this.datos_usuario_cliente = this.data.datos_usuario_cliente;
    this.usuarios_disponibles = this.data.usuarios_disponibles;
    this.datos_cliente = this.data.datos_cliente;

    this.clienteService.listarContactosByCliente_potenciales(this.datos_cliente).subscribe(
      response => {
        this.datos_contacto_cli = response;

        this.clienteService.fillDatosContactos_cli(response);

        this.clienteService._datoscontactos_cli.subscribe(response => {
          this.datos_contacto_cli = response;
        });
      },
      err => {

      },
      () => {

      }
    );
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


  editarContacto(datos: Clientes){
    this.dialog.open(EditarContactoComponent,{
      data: {datos_cliente: this.datos_cliente, datos_contacto: datos},
      width: '80%',
    });
  }

  listarContactos(datos : any){
    this.clienteService.listarContactosByCliente_potenciales(datos).subscribe(
      response => {
        this.datos_contacto_cli = response;

        this.clienteService.fillDatosContactos_cli(response);

        this.clienteService._datoscontactos_cli.subscribe(response => {
        });
      },
      err => {

      },
      () => {

      }
    );
  }


  eliminarContacto(datos: Clientes){


    this.clienteService.eliminarcontacto_prospectos(datos).subscribe(
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

        this.listarContactos(this.datos_cliente);

        this._snackBar.open('¡¡ Datos Guardados !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      //  this.dialog.closeAll();

      });

  }

  open_modal_contacto(){
    this.dialog.open(NuevoContactoComponent,{
      data: {datos_cliente: this.datos_cliente},
      width: '80%',
    });
  }


  guardarInformacion(){
    let datos: Clientes = new Clientes();
    datos = this.frm_cliente.value;

    console.table(datos);


    this.clienteService.guardarInformacion_Clientes(datos).subscribe(
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
          this.clienteService.getProspectosStakeholders(this.user).subscribe(
            data => {
              this.dataSource = data;

              this.clienteService.fillClientes_list(this.dataSource);

              this.clienteService._datos_cli.subscribe(response => {
              });
            });
      }
      );

  }
}
