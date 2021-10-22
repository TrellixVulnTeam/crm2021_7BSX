import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Atenciones } from 'src/app/models/atenciones';
import { Eventos } from 'src/app/models/eventos';
import { AtencionesService } from 'src/app/services/atenciones.service';

@Component({
  selector: 'app-cerrar-atencion',
  templateUrl: './cerrar-atencion.component.html',
  styleUrls: ['./cerrar-atencion.component.css']
})
export class CerrarAtencionComponent implements OnInit {
  datos_atencion : Atenciones = new Atenciones();
  no_eventos: any;
  si_eventos:any;
  eventosPendientes: Eventos[] = [];

  frm_resolucion_atn: FormGroup;

  constructor(public modal: MatDialogRef<CerrarAtencionComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private atencionService: AtencionesService, private _snackBar: MatSnackBar) {
    this.frm_resolucion_atn = new FormGroup({
      'atn_id': new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.datos_atencion = this.data.datos_atencion;

    this.atencionService.getEventosPendientes(this.datos_atencion).subscribe(
      data => {
          this.eventosPendientes = data;

          if(this.eventosPendientes.length === 0){
            this.si_eventos = false;
            this.no_eventos = true;
          }else{
            this.si_eventos = true;
            this.no_eventos = false;
          }
      }
    )
  }

  cerrarAtencion(){

  }

  cancelar(){
    this.modal.close();
  }

}
