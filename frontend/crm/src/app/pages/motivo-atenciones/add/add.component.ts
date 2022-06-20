import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MotivoAtenciones } from 'src/app/models/motivo-atenciones';
import { orden_trabajo } from 'src/app/models/orden_trabajo';
import { MotivoAtencionesService } from 'src/app/services/motivo-atenciones.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  form : FormGroup;
  data_motivosatn: MotivoAtenciones[] | undefined;
  validar!: boolean;
  data_orden: orden_trabajo[] | undefined;

  constructor(private motivoatn_service: MotivoAtencionesService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.form = new FormGroup({
      'sistema': new FormControl('',[Validators.required]),
      'descripcion': new FormControl('',[Validators.required]),
      'orden_trabajo': new FormControl('N/D',),
      'tipo_persona': new FormControl('N/D',),
    });

   }

  ngOnInit(): void {
    this.validar = false;
    this.getordenestrabajo();
  }

  save(){
    let datos : MotivoAtenciones = new MotivoAtenciones();

    datos = this.form.value;



    this.motivoatn_service.save(datos).subscribe(
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


  getordenestrabajo(){
    this.motivoatn_service.getOrdenesTrabajo().subscribe(
      data => {
        this.data_orden = data;
        console.log(this.data_orden);
      });

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
