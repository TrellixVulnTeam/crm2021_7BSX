import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MotivoAtenciones } from 'src/app/models/motivo-atenciones';
import { MotivoAtencionesService } from 'src/app/services/motivo-atenciones.service';
import { orden_trabajo } from 'src/app/models/orden_trabajo';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form : FormGroup;
  datos: MotivoAtenciones = new MotivoAtenciones();
  data_motivosatn: MotivoAtenciones[] | undefined;
  validar!: boolean;
  data_orden: orden_trabajo[] | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private motivoatn_service: MotivoAtencionesService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.form = new FormGroup({
      'id': new FormControl('',[Validators.required]),
      'sistema': new FormControl('',[Validators.required]),
      'descripcion': new FormControl('',[Validators.required]),
      'orden_trabajo': new FormControl('',),
      'tipo_persona': new FormControl('',),
    });
  }

  ngOnInit(): void {
    this.datos = this.data.data;
    this.getordenestrabajo();
  }

  getordenestrabajo(){
    this.motivoatn_service.getOrdenesTrabajo().subscribe(
      data => {
        this.data_orden = data;
        console.log(this.data_orden);
      });

  }

  save(){
    let datos : MotivoAtenciones = new MotivoAtenciones();

    datos = this.form.value;



    this.motivoatn_service.edit(datos).subscribe(
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


        this._snackBar.open('¡¡ Datos Guardados !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.getMotivosAtn();
        this.dialog.closeAll();

      });
  }

  cancel(){
    this.dialog.closeAll();
  }

  validar_campos(data: any){
    if(data === "GEST. COMERCIAL"){
      this.validar = true;
      this.form.controls["orden_trabajo"].setValue("N/D");
      this.form.controls["tipo_persona"].setValue("N/D");
    }else{
      this.validar = false;
      this.form.controls["orden_trabajo"].setValue("N/D");
      this.form.controls["tipo_persona"].setValue("N/D");
    }
  }


  getMotivosAtn(){
    this.motivoatn_service.getMotivosAtenciones().subscribe(
      data => {
        this.data_motivosatn = data;
        this.motivoatn_service.fill_motivoatn(data);
        this.motivoatn_service._datos_motivoatn.subscribe(response => {});
      });



  }

}
