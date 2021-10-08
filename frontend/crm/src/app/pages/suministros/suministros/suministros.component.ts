import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { Suministros } from 'src/app/models/suministros';
import { Usuario } from 'src/app/models/usuario';
import { ClientesService } from 'src/app/services/clientes.service';
import { GlobalService } from 'src/app/services/global.service';
import { SuministrosService } from 'src/app/services/suministros.service';
import { ModalAtencionSuministroComponent } from '../../atenciones/modal-atencion-suministro/modal-atencion-suministro.component';
import { ModalAtencionComponent } from '../../atenciones/modal-atencion/modal-atencion.component';
import { DetallesSuministroComponent } from '../detalles-suministro/detalles-suministro.component';

@Component({
  selector: 'app-suministros',
  templateUrl: './suministros.component.html',
  styleUrls: ['./suministros.component.css']
})
export class SuministrosComponent implements OnInit {

  user: Usuario = new Usuario();
  texto:any;
  datos_contacto_cli : Clientes[] | undefined;

  displayedColumns: string[] = ['num_suministro',  'estado', 'nombrecliente' , 'anexo_direccion','usuario_unicom',  'Acciones'];
  dataSource_suministros:any = new MatTableDataSource<any>([]);

  @ViewChild('paginator1') paginator1: MatPaginator | undefined;

  constructor(private global: GlobalService, private router: Router, private suministrosService: SuministrosService, private clienteService : ClientesService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.global.fillOpcionMenu('Suministros EDESAL');
    });

    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');
      setTimeout(() => {
        this.global.fillOpcionMenu('Suministros');
      });

    }else{
      this.router.navigate(['login']);
    }


  }



  getAllOrdenes(){
    this.suministrosService.getAllSuministros().subscribe(
      data => {

        //llenando arreglos
        this.dataSource_suministros.data = data;
      });


      this.suministrosService.fillSuministros_list(this.dataSource_suministros.data);

      this.suministrosService._datos_Suministros.subscribe(response => {
        this.dataSource_suministros.data = response;
      });
  }

  ngAfterViewInit() {
    this.dataSource_suministros.paginator = this.paginator1;
    this.getAllOrdenes();
  }



  filterTable_suministros(filterValue :string) {
    this.dataSource_suministros.filter = filterValue.trim().toLowerCase();
 }

 open_modal_atenciones(cliente: Suministros) {


      this.dialog.open(ModalAtencionSuministroComponent,{
        data: {datos_cliente: cliente, datos_contacto_cli: this.datos_contacto_cli, datos_suministro: '',  cliente: 'edesal',
                tipo: 'Atencion'},
        width: '80%',
      });

  }

verDetallesSuministro(row: Suministros){

  this.suministrosService.getAtencionesBySuministro(row).subscribe(
    data=>{
      this.dialog.open(DetallesSuministroComponent,{
        data: {datos_suministro: row, datos_historico: data},
        width: '80%',
      });
    }
  );

}

}
