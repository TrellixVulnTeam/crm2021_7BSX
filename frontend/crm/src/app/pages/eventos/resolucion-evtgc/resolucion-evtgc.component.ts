import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Archivos } from 'src/app/models/archivos';
import { Eventos } from 'src/app/models/eventos';
import { Usuario } from 'src/app/models/usuario';
import { EventosService } from 'src/app/services/eventos.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-resolucion-evtgc',
  templateUrl: './resolucion-evtgc.component.html',
  styleUrls: ['./resolucion-evtgc.component.css']
})
export class ResolucionEvtgcComponent implements OnInit {
  detalle_evento: Eventos = new Eventos();
  form_cerrar_evt: FormGroup;
  archivo!: File;
  obj_archivos: Archivos = new Archivos();
  user: Usuario = new Usuario();

  dataSource_evtTodosgc:any = new MatTableDataSource<any>([]);
  dataSource_evtAbiertosgc:any = new MatTableDataSource<any>([]);
  dataSource_evtProResoluciongc:any = new MatTableDataSource<any>([]);
  dataSource_evtCerradosgc:any = new MatTableDataSource<any>([]);
  btncomprobar: boolean | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private urlBackEnd: GlobalService,
  private http: HttpClient, private eventosService: EventosService, private _snackBar: MatSnackBar) {
    this.form_cerrar_evt = new FormGroup({
      'file': new FormControl('',[Validators.required]),
      'fecha': new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
    this.btncomprobar = false;
    this.detalle_evento = this.data.detalle_evento;
    this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');



  }

  subir_archivo(fileInput: any) {
    this.archivo = <File>fileInput.target.files[0];
  }

  cancel(){
    this.dialog.closeAll();
  }


  mover_archivo(){
    const formData = new FormData();
    formData.append('file', this.archivo);

    this.http.post(this.urlBackEnd.getUrlBackEnd() +'mover_archivo', formData)
    .subscribe(
      response => {

      },
      err => {
      },
      () => {
      });
      let form_archivos: Archivos = this.form_cerrar_evt.value;

      this.obj_archivos = form_archivos;
  }

  save(){
    this.mover_archivo();

    let datos : Eventos = new Eventos();
    datos.evento_id = this.detalle_evento.evento_id;
    datos.fecha_cierre = this.form_cerrar_evt.controls["fecha"].value;
    datos.file =     this.obj_archivos.file;
    datos.user_id_save = this.user.id;
    datos.atencion_id = this.detalle_evento.atencion_id;
    datos.user_alias = this.user.alias;
    datos.user_sucursal = this.user.codigo_sucursal;
    datos.num_suministro = this.detalle_evento.num_suministro;

    this.eventosService.guardarResolucion_gc(datos).subscribe(
      data =>{

      },
      err => {

      },
      () => {
        this.btncomprobar = true;
        this._snackBar.open('¡¡ La orden: '+ this.detalle_evento.descripcion_orden +'  ha sido generada con éxito !!', 'Ok', {
          duration: 6000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        //this.dialog.closeAll();
        this.getAllEventosgc();
      });
  }



  getAllEventosgc(){

    this.eventosService.getAllEventosGC(this.user).subscribe(
      data => {

        //llenando arreglos
        this.dataSource_evtTodosgc.data = data;

        data.forEach((element: any) => {
          if(element["estado"]==='Abierto'){
            this.dataSource_evtAbiertosgc.data.push(element);
          }
        });

        data.forEach((element: any) => {
          if(element["estado"]==='Proceso de resolucion'){
            this.dataSource_evtProResoluciongc.data.push(element);
          }
        });

        data.forEach((element: any) => {
          if(element["estado"]==='Cerrado'){
            this.dataSource_evtCerradosgc.data.push(element);
          }
        });

        //llenando behaviour subject
        this.eventosService.fillevtTodos_listgc(this.dataSource_evtTodosgc.data);
        this.eventosService.fillevtAbiertos_listgc(this.dataSource_evtAbiertosgc.data);
        this.eventosService.fillevtProResolucion_listgc(this.dataSource_evtProResoluciongc.data);
        this.eventosService.fillevtCerrados_listgc(this.dataSource_evtCerradosgc.data);

        //suscribiendose a arreglo para llenar tabla
        this.eventosService._datos_evtTodosgc.subscribe(response => {
          this.dataSource_evtTodosgc.data = response;
        });

        this.eventosService._datos_evtAbiertosgc.subscribe(response => {
          this.dataSource_evtAbiertosgc.data = response;
        });

        this.eventosService._datos_evtProResoluciongc.subscribe(response => {
          this.dataSource_evtProResoluciongc.data = response;
        });

        this.eventosService._datos_evtCerradosgc.subscribe(response => {
          this.dataSource_evtCerradosgc.data = response;
        });
      });

  }


  generarComprobante(){
    let datos: Eventos = new Eventos();
    datos.evento_id = this.detalle_evento.evento_id;
    datos.fecha_cierre = this.form_cerrar_evt.controls["fecha"].value;
    datos.num_suministro = this.detalle_evento.num_suministro;
    datos.user_impresion = this.user.nombre_usuario;

    const ur =  this.urlBackEnd.getUrlBackEnd() + 'imprimir_comprobante?id_evento=' + this.detalle_evento.evento_id
    +'&fecha_cierre='+ this.form_cerrar_evt.controls["fecha"].value+'&nis='+this.detalle_evento.num_suministro+
    '&id_atencion='+this.detalle_evento.atencion_id+'&user='+this.user.nombre_usuario;
    this.dialog.closeAll();
    window.open(ur, '_blank');

  }



}
