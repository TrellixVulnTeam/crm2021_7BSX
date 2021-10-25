import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Archivos } from 'src/app/models/archivos';
import { Atenciones } from 'src/app/models/atenciones';
import { ArchivosService } from 'src/app/services/archivos.service';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { DetallesComponent } from '../../atenciones/detalles/detalles.component';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.css']
})
export class HistorialClienteComponent implements OnInit {
  listado_atenciones: Atenciones[] = [];

  displayedColumns: string[] = ['id',  'cliente', 'usuarioCreacion' , 'descripcion', 'fechaC','estado'];
  dataSource_atn:any = new MatTableDataSource<any>([]);

  adjuntos: Archivos[] = [];

  titulo: any;
  subtitulo: any;

  texto1: any;
  @ViewChild('paginator1') paginator1: MatPaginator | undefined;

  constructor(  public modal_reporte: MatDialogRef<HistorialClienteComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private adjuntoService: ArchivosService, public atencionService: AtencionesService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource_atn.data = this.data.listado_atenciones;
    this.titulo = this.data.titulo;
    this.subtitulo = this.data.subtitulo;
  }

  ngAfterViewInit() {
    this.dataSource_atn.paginator = this.paginator1;
  }


  verDetalleAtencion(atencion: Atenciones){

    let datos: any;
    datos = atencion;

    this.adjuntoService.getAdjuntosAtencion(datos).subscribe(
      data=>{
        this.adjuntos = data;
        this.atencionService.getDetalleAtencion(atencion).subscribe(
          data=>{
            this.dialog.open(DetallesComponent,{
              data: {datos_atencion: data, datos_adjuntos: this.adjuntos},
              width: '80%',
            });
          }
        );
      });



  }



  filterTable_atn (filterValue :string) {
    this.dataSource_atn.filter = filterValue.trim().toLowerCase();
 }


}
