import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Archivos } from 'src/app/models/archivos';
import { ArchivosService } from 'src/app/services/archivos.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-subir-archivos',
  templateUrl: './subir-archivos.component.html',
  styleUrls: ['./subir-archivos.component.css']
})
export class SubirArchivosComponent implements OnInit {
  form_adjuntos : FormGroup;
  archivo!: File;
  obj_archivos: Archivos[] = [];

  constructor(private http: HttpClient, private urlBackEnd: GlobalService, public archivoService: ArchivosService) {
    this.form_adjuntos = new FormGroup({
      'file': new FormControl('',[Validators.required]),
      'descripcion': new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
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


}
