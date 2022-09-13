import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Otecnicas } from 'src/app/models/otecnicas';
import { Usuario } from 'src/app/models/usuario';
import { GlobalService } from 'src/app/services/global.service';
import { OtecnicasService } from 'src/app/services/otecnicas.service';

@Component({
  selector: 'app-detalles-otecnicas',
  templateUrl: './detalles-otecnicas.component.html',
  styleUrls: ['./detalles-otecnicas.component.css']
})
export class DetallesOtecnicasComponent implements OnInit {
  FormOrden: FormGroup;
  detalles_orden: Otecnicas = new Otecnicas();
  user: Usuario = new Usuario();

  dataSource_ordenesTodas:any = new MatTableDataSource<any>([]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ot_service: OtecnicasService,public modal: MatDialogRef<DetallesOtecnicasComponent>,
  private _snackBar: MatSnackBar, public urlBackEnd: GlobalService) {
    this.FormOrden = new FormGroup({
      'id': new FormControl('',),
      'trabajo': new FormControl('',),
      'fecha_solicitud': new FormControl('',),
      'fecha_resolucion': new FormControl('',),
      'direccion': new FormControl('',),
      'solicitante': new FormControl('',),
      'gerencia': new FormControl('',),
      'observaciones_soli': new FormControl('',),
      'observaciones_ejec': new FormControl('',),
      'comentario': new FormControl('',),
      'comentario1gg' : new FormControl('',),
      'comentario_res': new FormControl(''),
      'comentario_apV': new FormControl(''),
      'comentario_apAd': new FormControl(''),
      'comentario_deV': new FormControl(''),
      'comentario_deAd': new FormControl(''),
      'comentarioff': new FormControl(''),
      'user': new FormControl(''),
      'fecha_tecnica_aprob': new FormControl(''),
      'fecha_comercial_aprob': new FormControl(''),
      'usuario_tec': new FormControl(''),
      'usuario_comer': new FormControl(''),

      'comentario_apgg': new FormControl(''),
      'fecha_gg_aprob': new FormControl(''),
      'usuario_gg': new FormControl(''),
      'comentario_gg': new FormControl(''),
      'cliente': new FormControl(''),
      'ticket': new FormControl(''),
      'evento': new FormControl(''),
      'id_atencion': new FormControl(''),
      'atencion': new FormControl(''),
      'ticket_id': new FormControl(''),
      'evento_tt': new FormControl(''),
      'presupuesto': new FormControl(''),
      'ingr_mensuales': new FormControl(''),
      'ingr_anuales': new FormControl(''),
      'anios_est': new FormControl(''),


      'comentarioaprob_finanzas': new FormControl(''),
      'fecha_ff_aprob': new FormControl(''),
      'usuario_ff': new FormControl(''),


      'comentario_legal': new FormControl(''),
      'fecha_legal': new FormControl(''),
      'comentario_apLegal': new FormControl(''),

    });
  }

  ngOnInit(): void {
    this.detalles_orden = this.data.detalles_orden;
    this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');
  }


  aprobarOrdenTecnica(){
    let datos : Otecnicas = new Otecnicas();

    datos = this.FormOrden.value;

    this.ot_service.aprobarOrdenTecnica(datos).subscribe(
      data =>{

      },
      err =>{

      },
      ()=>{
        this.getAllOrdenes();
        this._snackBar.open('¡¡ Orden aprobada !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      }
    );


  }


  aprobarOrdenGG(){
    let datos : Otecnicas = new Otecnicas();

    datos = this.FormOrden.value;

    this.ot_service.aprobarOrdenGG(datos).subscribe(
      data =>{

      },
      err =>{

      },
      ()=>{
        this.getAllOrdenes();
        this._snackBar.open('¡¡ Orden aprobada !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      }
    );


  }



  denegarOrdenGG(){

    let datos : Otecnicas = new Otecnicas();

    datos = this.FormOrden.value;

    this.ot_service.denegarOrdenGG(datos).subscribe(
      data =>{

      },
      err =>{

      },
      ()=>{
        this.getAllOrdenes();
        this._snackBar.open('¡¡ Orden denegada !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      }
    );
  }


  aprobarOrdenVentas(){

    let datos : Otecnicas = new Otecnicas();

    datos = this.FormOrden.value;


    this.ot_service.aprobarOrdenVentas(datos).subscribe(
      data =>{

      },
      err =>{

      },
      ()=>{
        this.getAllOrdenes();
        this._snackBar.open('¡¡ Orden aprobada !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      }
    );
  }


  denegarOrdenTecnica(){

    let datos : Otecnicas = new Otecnicas();

    datos = this.FormOrden.value;

    this.ot_service.denegarOrdenTecnica(datos).subscribe(
      data =>{

      },
      err =>{

      },
      ()=>{
        this.getAllOrdenes();
        this._snackBar.open('¡¡ Orden denegada !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      }
    );
  }


  denegarOrdenVentas(){

    let datos : Otecnicas = new Otecnicas();

    datos = this.FormOrden.value;

    this.ot_service.denegarOrdenVentas(datos).subscribe(
      data =>{

      },
      err =>{

      },
      ()=>{

        this.getAllOrdenes();
        this._snackBar.open('¡¡ Orden denegada !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      }
    );
  }


  getAllOrdenes(){
    this.modal.close();
    this.ot_service.getAllOrdenes().subscribe(
      data => {

        //llenando arreglos
        this.dataSource_ordenesTodas.data = data;

        this.ot_service.fillordenesTodas_list(this.dataSource_ordenesTodas.data);

        this.ot_service._datos_ordenesTodas.subscribe(response => {
        });

      });



  }


  generarHoja(){
    console.log(this.detalles_orden);
    const ur =  this.urlBackEnd.getUrlBackEnd() + 'imprimirorden?id=' + this.detalles_orden.id;
    window.open(ur, '_blank');
  }




  aprobarOrdenFinanzas(){
    let datos : Otecnicas = new Otecnicas();

    datos = this.FormOrden.value;

    this.ot_service.aprobarOrdenFinanzas(datos).subscribe(
      data =>{

      },
      err =>{

      },
      ()=>{
        this.getAllOrdenes();
        this._snackBar.open('¡¡ Orden aprobada !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      }
    );


  }



  denegarOrdenFinanzas(){

    let datos : Otecnicas = new Otecnicas();

    datos = this.FormOrden.value;

    this.ot_service.denegarOrdenFinanzas(datos).subscribe(
      data =>{

      },
      err =>{

      },
      ()=>{
        this.getAllOrdenes();
        this._snackBar.open('¡¡ Orden denegada !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      }
    );
  }


  comentariolegal(){

    let datos : Otecnicas = new Otecnicas();

    datos = this.FormOrden.value;

    this.ot_service.comentariolegal(datos).subscribe(
      data =>{

      },
      err =>{

      },
      ()=>{
        this.getAllOrdenes();
        this._snackBar.open('¡¡ Comentario guardado !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      }
    );
  }

}
