import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MotivoAtenciones } from 'src/app/models/motivo-atenciones';
import { Usuario } from 'src/app/models/usuario';
import { GlobalService } from 'src/app/services/global.service';
import { MotivoAtencionesService } from 'src/app/services/motivo-atenciones.service';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-motivo-atenciones',
  templateUrl: './motivo-atenciones.component.html',
  styleUrls: ['./motivo-atenciones.component.css']
})
export class MotivoAtencionesComponent implements OnInit {
  data_motivosatn:any = new MatTableDataSource<any>([]);
  texto:any;
  displayedColumns: string[] = ['id',  'nombre', 'sistema'];
  user: Usuario = new Usuario();
  @ViewChild('paginator') paginator: MatPaginator | undefined;


  //gestiones comerciales
  data_motivosatn_gc:any = new MatTableDataSource<any>([]);
  displayedColumns_gc: string[] = ['id',  'nombre', 'sistema'];
  @ViewChild('paginator_1') paginator_1: MatPaginator | undefined;
  texto1:any;

  constructor(private motivoatn_service: MotivoAtencionesService, private global: GlobalService, private router: Router,
    public dialog: MatDialog, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    setTimeout(() => {
      this.global.fillOpcionMenu('Motivos de atención(CRM) / Tipos de solicitud (Gestiones comerciales)');
    });


    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');


    }else{
      this.router.navigate(['login']);
    }


    //this.getMotivosAtn();
  }


  ngAfterViewInit() {
    this.data_motivosatn.paginator = this.paginator;
    this.data_motivosatn_gc.paginator = this.paginator_1;
    this.getMotivosAtn();
  }


  getMotivosAtn(){
    this.motivoatn_service.getMotivosAtenciones().subscribe(
      data => {

        //llenando arreglos
        this.data_motivosatn.data = data;
      });
      this.motivoatn_service.fill_motivoatn(this.data_motivosatn.data);

      this.motivoatn_service._datos_motivoatn.subscribe(response => {
        this.data_motivosatn.data = response;
      });


      this.motivoatn_service.getMotivosAtenciones_GC().subscribe(
        data => {
          //llenando arreglos
          this.data_motivosatn_gc.data = data;
        });
        this.motivoatn_service.fill_motivoatngc(this.data_motivosatn_gc.data);

        this.motivoatn_service._datos_motivoatngc.subscribe(response => {
          this.data_motivosatn_gc.data = response;
        });
  }



  filterTable(filterValue :string) {
    this.data_motivosatn.filter = filterValue.trim().toLowerCase();
 }


 filterTable_gc(filterValue :string) {
  this.data_motivosatn_gc.filter = filterValue.trim().toLowerCase();
}


 delete(data: MotivoAtenciones){
  let datos : MotivoAtenciones = new MotivoAtenciones();
  datos = data;

  this.motivoatn_service.delete(datos).subscribe(
    response => {
    },
    err => {
      this._snackBar.open('¡¡ Error !!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });

    },
    () => {


      this._snackBar.open('¡¡ Datos Eliminados !!', 'Ok', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.getMotivosAtn();
      this.dialog.closeAll();

    });
}

 agregarNuevo(){
  this.dialog.open(AddComponent,{
    data: {},
    width: '70%',
  });
 }


 edit(data: MotivoAtenciones){
  this.dialog.open(EditComponent,{
    data: {data: data},
    width: '70%',
  });
 }

}
