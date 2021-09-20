import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { Usuario } from 'src/app/models/usuario';
import { ClientesService } from 'src/app/services/clientes.service';
import { ModalAtencionComponent } from '../../atenciones/modal-atencion/modal-atencion.component';
import { DetallesClienteComponent } from '../../clientes/detalles-cliente/detalles-cliente.component';
import { DetallesComponent } from '../detalles/detalles.component';

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
  datos_cliente : Clientes = new Clientes();
  datos_contacto : Clientes[] | undefined;
  datos_suministro : Clientes[] | undefined;
  datos_usuario_cliente : Clientes[] | undefined;
  usuarios_disponibles: Clientes[] | undefined;

  @ViewChild('paginator1') paginator1: MatPaginator | undefined;
  @ViewChild('paginator2') paginator2: MatPaginator | undefined;


  constructor(private router: Router, private clienteService : ClientesService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');


      this.clienteService.getProspectosStakeholders(this.user).subscribe(
        data => {
          this.dataSource.data = data;
        });


      this.clienteService.getClientesCompartidos(this.user).subscribe(
        data => {
          this.dataSource1.data = data;
        });


    }else{
      this.router.navigate(['login']);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator1;
    this.dataSource1.paginator = this.paginator2;
  }


  //Obtener datos clientes
  getClienteByName(datos_cli: Clientes){
    this.datos_cliente = datos_cli;

          this.clienteService.listarContactosByCliente_potenciales(datos_cli).subscribe(
            response => {
              this.datos_contacto = response;
            },
            err => {

            },
            () => {

              this.clienteService.getUsuariosByCliente(datos_cli).subscribe(
                response => {
                  this.datos_usuario_cliente = response;
                },
                err => {

                },
                () => {

                  this.clienteService.getUsuariosDisponibles(datos_cli).subscribe(
                    response => {
                      this.usuarios_disponibles = response;
                    },
                    err => {

                    },
                    () => {

                      this.dialog.open(DetallesComponent,{
                        data:{datos_contacto: this.datos_contacto, datos_usuario_cliente:this.datos_usuario_cliente,
                        usuarios_disponibles: this.usuarios_disponibles, datos_cliente: this.datos_cliente },
                        width: '70%'
                    });

                    }
                  );



                }
              );

            });


  }



  open_modal_atenciones(cliente: Clientes) {

    this.clienteService.getContactosPotenciales(cliente).subscribe(
      data => {
        this.datos_contacto = data;

        this.dialog.open(ModalAtencionComponent,{
          data: {datos_cliente: cliente, datos_contacto: this.datos_contacto, datos_suministro: ''},
          width: '70%',
        });
      });

  }


}
