import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Atenciones } from 'src/app/models/atenciones';
import { Eventos } from 'src/app/models/eventos';
import { Usuario } from 'src/app/models/usuario';
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
  user: Usuario = new Usuario();
  frm_resolucion_atn: FormGroup;
  dataSource_atnTodas:any = new MatTableDataSource<any>([]);
  dataSource_atnAbiertas:any = new MatTableDataSource<any>([]);
  dataSource_atnCerradas:any = new MatTableDataSource<any>([]);

  constructor(public modal: MatDialogRef<CerrarAtencionComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private atencionService: AtencionesService, private _snackBar: MatSnackBar,
  public dialog: MatDialog,) {
    this.frm_resolucion_atn = new FormGroup({
      'id_atencion': new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');
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
    let datos : Atenciones = new Atenciones();
    datos = this.frm_resolucion_atn.value;

    this.atencionService.cerrarAtencion(datos).subscribe(
      data => {

      },
      err=>{
        this._snackBar.open('Error', 'No se cerró la atención', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      ()=>{
        this.getAllAtenciones();
        this._snackBar.open('¡¡ Atención cerrada !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.dialog.closeAll();

      }

    );
  }

  cancelar(){
    this.modal.close();
  }


  getAllAtenciones(){
    this.atencionService.getAllAtenciones(this.user).subscribe(
      data => {

        //llenanado listas de tabla html
        this.dataSource_atnTodas.data = data;

        data.forEach((element: any) => {
          if(element["estado"]==='Abierta'){
            this.dataSource_atnAbiertas.data.push(element);

          }
        });


        data.forEach((element: any) => {
          if(element["estado"]==='Cerrada'){
            this.dataSource_atnCerradas.data.push(element);

          }
        });

        //llenanado arreglo del service
        this.atencionService.fillatnCerradas_list(this.dataSource_atnCerradas.data);

        this.atencionService.fillatnAbiertas_list(this.dataSource_atnAbiertas.data);

        this.atencionService.fillatnTodas_list(this.dataSource_atnTodas.data);


        //suscribiendose al arreglo para obtener data
        this.atencionService._datos_atnTodas.subscribe(response => {
        });

        this.atencionService._datos_atnAbiertas.subscribe(response => {
        });


        this.atencionService._datos_atnCerradas.subscribe(response => {
        });


    });



      //console.table(this.dataSource_atnAbiertas.data);

  }



}
