import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MotivoAtenciones } from 'src/app/models/motivo-atenciones';
import { MttoCartas } from 'src/app/models/mtto-cartas';
import { Usuario } from 'src/app/models/usuario';
import { GlobalService } from 'src/app/services/global.service';
import { MotivoAtencionesService } from 'src/app/services/motivo-atenciones.service';
import { MttoCartasService } from 'src/app/services/mtto-cartas.service';

@Component({
  selector: 'app-mtto-cartas',
  templateUrl: './mtto-cartas.component.html',
  styleUrls: ['./mtto-cartas.component.css']
})
export class MttoCartasComponent implements OnInit {
  carta_form: FormGroup;
  data_motivosatn : MotivoAtenciones[] | undefined;
  user: Usuario = new Usuario();
  datos_cartas: MttoCartas[] |undefined;
  visibilidad : boolean | undefined;
  parrafos_form!: FormGroup;
  nuevo_parrafo_form!: FormGroup;

  constructor(private motivoatn_service: MotivoAtencionesService, private _snackBar: MatSnackBar, public dialog: MatDialog, private router: Router,
    private global: GlobalService, private mttocartas_service: MttoCartasService, private formbuilder: FormBuilder) {
    this.carta_form = new FormGroup({
      'carta': new FormControl('',[Validators.required]),
    });
    this.nuevo_parrafo_form = new FormGroup({
      'parrafo': new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.visibilidad = false;
    this.parrafos_form = this.formbuilder.group({parrafos: this.formbuilder.array([]),});

    setTimeout(() => {
      this.global.fillOpcionMenu('Claúsulas aclaratorias');
    });
    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');
      this.getMotivosAtn();

    }else{
      this.router.navigate(['login']);
    }

  }


  get parrafos(){
    return this.parrafos_form.get('parrafos') as FormArray;
  }



  getMotivosAtn(){
    this.motivoatn_service.getMotivosAtenciones_GC().subscribe(
      data => {
        this.data_motivosatn = data;
      });
  }

  choose(){
    this.parrafos_form = this.formbuilder.group({parrafos: this.formbuilder.array([]),});

    this.visibilidad = false;

    let datos : MttoCartas = new MttoCartas();
    datos = this.carta_form.value;

    this.mttocartas_service.getDatosbyCarta(datos).subscribe(
      data=>{
        this.datos_cartas = data;
      },
      err=>{},
      ()=>{

        this.datos_cartas?.forEach(element =>{
          this.parrafos.push(
            this.formbuilder.group(
              {
                id: element["id"],
                id_tipo_solicitud: element["id_tipo_solicitud"],
                parrafo: element["parrafo"],
              }
            )
          );
        });


        this.visibilidad = true;
      }
    )};


    addnew_parrafo(){
      let datos : MttoCartas = new MttoCartas();
      datos.id_tipo_solicitud = this.carta_form.controls["carta"].value;
      datos.parrafo = this.nuevo_parrafo_form.controls["parrafo"].value;

      this.mttocartas_service.save_parrafo(datos).subscribe(
        response=>{
            this.parrafos.push(
              this.formbuilder.group(
                {
                  id: response,
                  id_tipo_solicitud: datos.id_tipo_solicitud,
                  parrafo: datos.parrafo,
                }
              )
            );
          },
          err=>{

          },
          ()=>{

          });

    }



    edit_parrafo(item: any, i: any){

      var all_parrafos = this.parrafos_form.get('parrafos') as FormArray;
      var parrafo_byindex = all_parrafos.at(i);
      var parrafo_nuevo = parrafo_byindex.value;

      let datos : MttoCartas = new MttoCartas();
      datos.parrafo = parrafo_nuevo.parrafo;
      datos.id = item;

      console.log(parrafo_nuevo);

      this.mttocartas_service.edit_parrafo(datos).subscribe(
        response=>{},
        err=>{
          this._snackBar.open('¡¡ Error  al guardar!!', 'Ok', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        },
        ()=>{
          this._snackBar.open('¡¡ Datos modificados !!', 'Ok', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      );

    }

}


