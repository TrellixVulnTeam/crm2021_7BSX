import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
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
  form_contacto: FormGroup;
  selectedData!: { value: any; text: string; };
  cliente_id : any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,
  private clienteService : ClientesService, private _snackBar: MatSnackBar,public dialog: MatDialog) {
    this.form_agregar_usuario = new FormGroup({
      'cliente': new FormControl('',),
      'usuario': new FormControl('',),
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
      'categoria' : new FormControl(''),
      'usuario': new FormControl(''),
    });

    this.form_contacto = new FormGroup({
      'nombre': new FormControl('',),
      'cargo': new FormControl('',),
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

      this.getUsuarioDisponibles();

  }

  getSelectText(event: MatSelectChange) {
    this.selectedData = {
      value: event.value,
      text: event.source.triggerValue
    };

  }



  agregarUsuarioCompartido(){
    let datos : Clientes = new Clientes();
    datos.id = this.selectedData?.value;
    datos.nombre = this.selectedData?.text;

    this.datos_usuario_cliente.push(datos);

    //console.table(this.datos_usuario_cliente);
  }

  eliminarUsuario(index: any){


    this.datos_usuario_cliente.splice(index, 1);

  }


  getProspectos(){
    this.clienteService.getProspectosStakeholders(this.user).subscribe(
      data => {
        this.dataSource.data = data;

        this.clienteService.fillClientes_list(this.dataSource.data);

        this.clienteService._datos_cli.subscribe();
      });
  }




  guardarInformacion(){
    let datos : Clientes = new Clientes();
    datos = this.frm_cliente.value;


    this.clienteService.guardarCliente_prospectos(datos).subscribe(
      response => {
        this.cliente_id = response;


        var id_cliente = this.cliente_id;

        this.datos_usuario_cliente.forEach(function(e){
          if (typeof e === "object" ){
            e["codigo"] =  id_cliente;
          }
        });

        this.datos_contacto_cli.forEach(function(e){
          if (typeof e === "object" ){
            e["codigo"] =  id_cliente;
          }
        });

      },
      err => {
        this._snackBar.open('¡¡ Error !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      },
      () => {


        this.clienteService.guardar_contactos_cliente(this.datos_contacto_cli).subscribe(
          response => {},
          err => {},
          () => {});

          this.clienteService.guardar_usuarios_cliente(this.datos_usuario_cliente).subscribe(
            response => {},
            err => {},
            () => {});

          this._snackBar.open('¡¡ Cliente creado !!', 'Ok', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.dialog.closeAll();
          this.getProspectos();

      });
  }


  getUsuarioDisponibles(){
    this.clienteService.getAllUsuariosDisponibles().subscribe(
      response => {
        this.usuarios_disponibles = response;
      },
      err => {

      },
      () => {

      });
  }


  agregar_contacto(){
    let datos : Clientes = new Clientes();
    datos = this.form_contacto.value;


    this.datos_contacto_cli.push(datos);

    this.form_contacto.controls["nombre"].setValue('');
    this.form_contacto.controls["cargo"].setValue('');
    this.form_contacto.controls["correo"].setValue('');
    this.form_contacto.controls["celular1"].setValue('');
    this.form_contacto.controls["telefono1"].setValue('');
  }


  eliminarContacto(index: any){


    this.datos_contacto_cli.splice(index, 1);

  }




}
