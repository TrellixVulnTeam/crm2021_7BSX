import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Archivos } from 'src/app/models/archivos';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-ver-archivos',
  templateUrl: './ver-archivos.component.html',
  styleUrls: ['./ver-archivos.component.css']
})
export class VerArchivosComponent implements OnInit {

  archivos: Archivos = new Archivos();
  extension!: string;
  adjunto!: SafeResourceUrl;

  constructor(public modal_archivo: MatDialogRef<VerArchivosComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private url: GlobalService, public sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.archivos = this.data.archivo;


    this.extension = (this.archivos.adjunto.slice(this.archivos.adjunto.length -3));


    var url = this.url.getUrlBackEnd()+'files/'+this.archivos.adjunto+'';

    this.adjunto =  this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }


  Cerrar(){
    this.modal_archivo.close();
  }

}
