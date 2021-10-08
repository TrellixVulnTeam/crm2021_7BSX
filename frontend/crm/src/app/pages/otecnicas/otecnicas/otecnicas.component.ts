import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Otecnicas } from 'src/app/models/otecnicas';
import { Usuario } from 'src/app/models/usuario';
import { GlobalService } from 'src/app/services/global.service';
import { OtecnicasService } from 'src/app/services/otecnicas.service';
import { DetallesOtecnicasComponent } from '../detalles-otecnicas/detalles-otecnicas.component';

@Component({
  selector: 'app-otecnicas',
  templateUrl: './otecnicas.component.html',
  styleUrls: ['./otecnicas.component.css']
})
export class OtecnicasComponent implements OnInit {
  user: Usuario = new Usuario();
  texto:any;

  displayedColumns: string[] = ['id',  'solicitud', 'fecha_creacionD' , 'nombresolicitante',  'Acciones'];
  dataSource_ordenesTodas:any = new MatTableDataSource<any>([]);

  @ViewChild('paginator1') paginator1: MatPaginator | undefined;

  constructor( private global: GlobalService, private router: Router, private ordenesService: OtecnicasService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.global.fillOpcionMenu('Ordenes Técnicas CRM');
    });


    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');


    }else{
      this.router.navigate(['login']);
    }


  }


  getAllOrdenes(){
    this.ordenesService.getAllOrdenes().subscribe(
      data => {

        //llenando arreglos
        this.dataSource_ordenesTodas.data = data;
      });


      this.ordenesService.fillordenesTodas_list(this.dataSource_ordenesTodas.data);

      this.ordenesService._datos_ordenesTodas.subscribe(response => {
        this.dataSource_ordenesTodas.data = response;
      });
  }

  ngAfterViewInit() {
    this.dataSource_ordenesTodas.paginator = this.paginator1;
    this.getAllOrdenes();
  }



  filterTable_ordenesTodas(filterValue :string) {
    this.dataSource_ordenesTodas.filter = filterValue.trim().toLowerCase();
 }


 verDetalleOrden(datos: Otecnicas){
  this.dialog.open(DetallesOtecnicasComponent,{
    data: {detalles_orden: datos},
    width: '80%',
  });
 }
}
