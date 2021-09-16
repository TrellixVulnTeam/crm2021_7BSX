import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { Usuario } from 'src/app/models/usuario';
import { ClientesService } from 'src/app/services/clientes.service';
import { ModalAtencionComponent } from '../../atenciones/modal-atencion/modal-atencion.component';

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


  datos_contacto : Clientes[] | undefined;
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


  open_modal_atenciones(cliente: Clientes) {


    this.clienteService.getContactosPotenciales(cliente).subscribe(
      data => {
        this.datos_contacto = data;

        this.dialog.open(ModalAtencionComponent,{
          data: {datos_cliente: cliente, datos_contacto: this.datos_contacto, datos_suministro: ''}
        });
      });




  }


}
