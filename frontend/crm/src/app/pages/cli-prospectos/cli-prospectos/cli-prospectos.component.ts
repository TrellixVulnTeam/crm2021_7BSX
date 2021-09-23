import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { Usuario } from 'src/app/models/usuario';
import { ClientesService } from 'src/app/services/clientes.service';
import { GlobalService } from 'src/app/services/global.service';
import { ModalAtencionComponent } from '../../atenciones/modal-atencion/modal-atencion.component';
import { DetallesClienteComponent } from '../../clientes/detalles-cliente/detalles-cliente.component';
import { DetallesComponent } from '../detalles/detalles.component';
import { NuevoClienteComponent } from '../nuevo-cliente/nuevo-cliente.component';
import { NuevoContactoComponent } from '../nuevo-contacto/nuevo-contacto.component';

@Component({
  selector: 'app-cli-prospectos',
  templateUrl: './cli-prospectos.component.html',
  styleUrls: ['./cli-prospectos.component.css']
})
export class CliProspectosComponent implements OnInit {
  user: Usuario = new Usuario();
  displayedColumns: string[] = ['codigo',  'nomCategoria', 'nombrecliente', 'direccion' , 'Acciones'];
  dataSource:any = new MatTableDataSource<any>([]);

  displayedColumns1: string[] = ['codigo',  'nomCategoria', 'nombrecliente', 'direccion' , 'Acciones'];
  dataSource1:any = new MatTableDataSource<any>([]);


  mostrarDatos = false;
  cargaDatos = false;
  notfound = false;
  texto: any;
  datos_cliente : Clientes = new Clientes();
  datos_contacto_cli : Clientes[] | undefined;
  datos_suministro : Clientes[] | undefined;
  datos_usuario_cliente : Clientes[] | undefined;
  usuarios_disponibles: Clientes[] | undefined;

  @ViewChild('paginator1') paginator1: MatPaginator | undefined;
  @ViewChild('paginator2') paginator2: MatPaginator | undefined;


  constructor(private router: Router, private clienteService : ClientesService,
    public dialog: MatDialog, public global: GlobalService) { }

  ngOnInit(): void {
    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');

      this.getClientesCompartidos();
      this.getProspectos();

      setTimeout(() => {
        this.global.fillOpcionMenu('Clientes prospectos y compartidos');
      });






    }else{
      this.router.navigate(['login']);
    }
  }


  filterTable_misClientes (filterValue :string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
 }

  filterTable_compartidos (filterValue :string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
 }




  getProspectos(){
    this.clienteService.getProspectosStakeholders(this.user).subscribe(
      data => {
        this.dataSource.data = data;

        this.clienteService.fillClientes_list(this.dataSource.data);

        this.clienteService._datos_cli.subscribe(response => {
          this.dataSource.data = response;
        });
      });
  }


  getClientesCompartidos(){
    this.clienteService.getClientesCompartidos(this.user).subscribe(
      data => {
        this.dataSource1.data = data;
        this.clienteService.fillClientes_list_compartidos(this.dataSource1.data);

        this.clienteService._datos_cli_compartidos.subscribe(response => {
          this.dataSource1.data = response;
        });

      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator1;
    this.dataSource1.paginator = this.paginator2;
  }


  getUsuariosByCliente(datos_cli: Clientes){
    this.clienteService.getUsuariosByCliente(datos_cli).subscribe(
      response => {
        this.datos_usuario_cliente = response;
      },
      err => {

      },
      () => {

      }
    );
  }


  getUsuariosDisponibles(datos_cli: Clientes){
    this.clienteService.getUsuariosDisponibles(datos_cli).subscribe(
      response => {
        this.usuarios_disponibles = response;
      },
      err => {

      },
      () => {

        this.dialog.open(DetallesComponent,{
          data:{datos_contacto_cli: this.datos_contacto_cli, datos_usuario_cliente:this.datos_usuario_cliente,
          usuarios_disponibles: this.usuarios_disponibles, datos_cliente: this.datos_cliente },
          width: '70%'
      });

      }
    );
  }


  getContactosPot(datos_cli : Clientes){
    this.clienteService.listarContactosByCliente_potenciales(datos_cli).subscribe(
      response => {
        this.datos_contacto_cli = response;

        this.clienteService.fillDatosContactos_cli(response);

        this.clienteService._datoscontactos_cli.subscribe(response => {
        });
      },
      err => {

      },
      () => {
      });
  }

  //Obtener datos clientes
  getClienteByName(datos_cli: Clientes){
    this.datos_cliente = datos_cli;


              this.getUsuariosByCliente(datos_cli);
              this.getUsuariosDisponibles(datos_cli);
              this.getContactosPot(datos_cli);

  }



  open_modal_atenciones(cliente: Clientes) {

    this.clienteService.getContactosPotenciales(cliente).subscribe(
      data => {
        this.datos_contacto_cli = data;

        this.dialog.open(ModalAtencionComponent,{
          data: {datos_cliente: cliente, datos_contacto_cli: this.datos_contacto_cli, datos_suministro: '',  cliente: 'cli'},
          width: '80%',
        });
      });

  }


  open_modal_contacto(datos: Clientes) {

    this.dialog.open(NuevoContactoComponent,{
      data: {datos_cliente: datos},
      width: '80%',
    });
  }


  agregarNuevoCliente(){
    this.dialog.open(NuevoClienteComponent,{
      width: '80%',
    });
  }



}
