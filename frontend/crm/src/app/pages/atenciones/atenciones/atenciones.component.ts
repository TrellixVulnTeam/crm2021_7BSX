import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Atenciones } from 'src/app/models/atenciones';
import { Usuario } from 'src/app/models/usuario';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { GlobalService } from 'src/app/services/global.service';
import { ModalEventoComponent } from '../../eventos/modal-evento/modal-evento.component';

@Component({
  selector: 'app-atenciones',
  templateUrl: './atenciones.component.html',
  styleUrls: ['./atenciones.component.css']
})
export class AtencionesComponent implements OnInit {

  user: Usuario = new Usuario();
  displayedColumns: string[] = ['id',  'cliente', 'usuarioCreacion' , 'descripcion', 'fechaC','estado', 'Acciones'];
  dataSource_atnTodas:any = new MatTableDataSource<any>([]);

  dataSource_atnAbiertas:any = new MatTableDataSource<any>([]);
  dataSource_atnCerradas:any = new MatTableDataSource<any>([]);
  texto: any;
  texto1: any;
  texto2:any;

  @ViewChild('paginator1') paginator1: MatPaginator | undefined;
  @ViewChild('paginator2') paginator2: MatPaginator | undefined;
  @ViewChild('paginator3') paginator3: MatPaginator | undefined;


  constructor(public atencionService: AtencionesService, private router: Router, private global: GlobalService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');
      setTimeout(() => {
        this.global.fillOpcionMenu('Atenciones');
      });

    }else{
      this.router.navigate(['login']);
    }

  }


  ngAfterViewInit() {


    this.dataSource_atnTodas.paginator = this.paginator1;
    this.dataSource_atnAbiertas.paginator = this.paginator2;
    this.dataSource_atnCerradas.paginator = this.paginator3;
    this.getAllAtenciones();
  }


  filterTable_atnTodas (filterValue :string) {
    this.dataSource_atnTodas.filter = filterValue.trim().toLowerCase();
 }


 filterTable_atnAbiertas(filterValue :string) {
    this.dataSource_atnAbiertas.filter = filterValue.trim().toLowerCase();
}

filterTable_atnCerradas(filterValue :string) {

  this.dataSource_atnCerradas.filter = filterValue.trim().toLowerCase();


}

  getAllAtenciones(){
    this.atencionService.getAllAtenciones(this.user).subscribe(
      data => {

        //llenanado listas de tabla html
        this.dataSource_atnTodas.data = data;

        data.forEach((element: any) => {
          if(element["estado"]==='Abierta'){
            this.dataSource_atnAbiertas.data.push(element);

          }
        });


        data.forEach((element: any) => {
          if(element["estado"]==='Cerrada'){
            this.dataSource_atnCerradas.data.push(element);

          }
        });

        //llenanado arreglo del service
        this.atencionService.fillatnCerradas_list(this.dataSource_atnCerradas.data);

        this.atencionService.fillatnAbiertas_list(this.dataSource_atnAbiertas.data);

        this.atencionService.fillatnTodas_list(this.dataSource_atnTodas.data);


        //suscribiendose al arreglo para obtener data
        this.atencionService._datos_atnTodas.subscribe(response => {
          this.dataSource_atnTodas.data = response;
        });

        this.atencionService._datos_atnAbiertas.subscribe(response => {
          this.dataSource_atnAbiertas.data = response;
        });


        this.atencionService._datos_atnCerradas.subscribe(response => {
          this.dataSource_atnCerradas.data = response;
        });


    });



      //console.table(this.dataSource_atnAbiertas.data);

  }


  nuevoEvento(atencion: Atenciones){
    this.dialog.open(ModalEventoComponent,{
      data: {datos_atencion: atencion},
      width: '80%',
    });
  }


}
