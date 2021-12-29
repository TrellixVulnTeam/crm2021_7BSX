import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Archivos } from 'src/app/models/archivos';
import { Atenciones } from 'src/app/models/atenciones';
import { Eventos } from 'src/app/models/eventos';
import { Usuario } from 'src/app/models/usuario';
import { ArchivosService } from 'src/app/services/archivos.service';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { GlobalService } from 'src/app/services/global.service';
import { GenerarTicketComponent } from '../../eventos/generar-ticket/generar-ticket.component';



@Component({
  selector: 'app-subir-archivos',
  templateUrl: './subir-archivos.component.html',
  styleUrls: ['./subir-archivos.component.css']
})
export class SubirArchivosComponent implements OnInit {
  form_adjuntos : FormGroup;
  archivo!: File;
  obj_archivos: Archivos[] = [];
  user: Usuario = new Usuario();

  atn_id : any | undefined;
  //variables de entrada

  @Input()  arreglo_atenciones : Atenciones = new Atenciones();
  @Input()  atencion_id : any;

  @Input()  arreglo_evento : Eventos = new Eventos();
  @Input()  evento_id : any;
  @Input()  tipo : string | undefined;

  constructor(private http: HttpClient, private urlBackEnd: GlobalService,
    public archivoService: ArchivosService,private _snackBar: MatSnackBar,
    private router: Router, private atencionService : AtencionesService,
    public dialog: MatDialog
    ) {
    this.form_adjuntos = new FormGroup({
      'file': new FormControl('',[Validators.required]),
      'descripcion': new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
    console.log(this.tipo);


    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');

      }else{
        this.router.navigate(['login']);
      }
  }

   //validacion del archivo seleccionado
 subir_archivo(fileInput: any) {
  this.archivo = <File>fileInput.target.files[0];
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
      let form_archivos: Archivos = this.form_adjuntos.value;

      this.obj_archivos.push(form_archivos);

      console.log(this.obj_archivos);
  }


  eliminar_archivo(name:any, index:any){
    var nombre_file = new Archivos();
    nombre_file.file = name;

    this.http.post(this.urlBackEnd.getUrlBackEnd() +'eliminar_archivo?file=', nombre_file)
    .subscribe(
      response => {
      },
      err => {
      },
      () => {
      });

      this.obj_archivos.splice(index, 1);
  }


  guardarArchivos_evt(){


    var id_evt = this.evento_id;
    var iduser = this.user.id;

    this.obj_archivos.forEach(function(e){
      if (typeof e === "object" ){
        e["evento_id"] =  id_evt;
        e["usuario_id"] = iduser;
      }
    });

    this.archivoService.guardarArchivosEvt(this.obj_archivos).subscribe(
      response => {

      },
      err => {
        this._snackBar.open('Error al guardar', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      () => {
        this._snackBar.open('¡¡ Datos Guardados !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this.dialog.open(GenerarTicketComponent,{
          data:{
            evento_id: this.evento_id, accion: 'finalizar evento'
          }
        }
         );

      }
      );

  }


}







