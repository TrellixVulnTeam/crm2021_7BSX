import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Atenciones } from 'src/app/models/atenciones';
import { Clientes } from 'src/app/models/clientes';
import { Eventos } from 'src/app/models/eventos';
import { MotivoAtenciones } from 'src/app/models/motivo-atenciones';
import { MttoCartas } from 'src/app/models/mtto-cartas';
import { Suministros } from 'src/app/models/suministros';
import { Usuario } from 'src/app/models/usuario';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { EventosService } from 'src/app/services/eventos.service';
import { MotivoAtencionesService } from 'src/app/services/motivo-atenciones.service';
import { MttoCartasService } from 'src/app/services/mtto-cartas.service';
import { SuministrosService } from 'src/app/services/suministros.service';
import { GenerarEventoComponent } from '../generar-evento/generar-evento.component';


@Component({
  selector: 'app-modal-atenciones-gestcomerciales',
  templateUrl: './modal-atenciones-gestcomerciales.component.html',
  styleUrls: ['./modal-atenciones-gestcomerciales.component.css']
})
export class ModalAtencionesGestcomercialesComponent implements OnInit {
  form_atencion: FormGroup;
  sistema_motivoatn: any;
  clausula_atn: any;
  titulo_atn: any;
  tipo_persona : any;
  tipo_persona_validar!: boolean;
  list_motivo_atenciones : Atenciones[] = [];
  list_tipo_atenciones : Atenciones[] = [];
  datos_contacto : Clientes[] = [];
  datos_suministro : Clientes[] = [];
  datos_repre : Atenciones = new Atenciones();
  datos_cliente : Clientes = new Clientes();
  user: Usuario = new Usuario();
  tipo_atencion = '';
  arreglo_atenciones: Atenciones = new Atenciones();
  atencion_id_evt : any;
  atencion_id : any;
  datos_contacto_input : Suministros = new Suministros();

  constructor(public atencionService: AtencionesService,
    public modal_atencion: MatDialogRef<ModalAtencionesGestcomercialesComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, private _snackBar: MatSnackBar, private clienteService : ClientesService,public dialog: MatDialog,
    private motivoatn_service: MotivoAtencionesService, private eventosService: EventosService, private mttocartas_service: MttoCartasService,
    private suministro_service: SuministrosService) {
    this.form_atencion = new FormGroup({
      'codigo': new FormControl(''),
      'suministro': new FormControl(''),
      'cliente': new FormControl(''),
      'contacto': new FormControl(''),
      'telefono': new FormControl(''),
      'tipo_atencion': new FormControl(''),
      'motivo_atencion': new FormControl(''),
      'titulo_atn': new FormControl(''),
      'descripcion_atencion': new FormControl(''),
      'email' : new FormControl(''),
      'fax' : new FormControl(''),
      'whatsapp' : new FormControl(''),
      'usuario_crm' : new FormControl(''),
      'ap_nombre' : new FormControl(''),
      'ap_profesion' : new FormControl(''),
      'ap_dui' : new FormControl(''),
      'ap_nit' : new FormControl(''),
      'ap_domicilio' : new FormControl(''),
      'ap_actua' : new FormControl(''),
      'ap_departamento' : new FormControl(''),
    });
  }

  ngOnInit(): void {

    this.tipo_persona_validar = false;

    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');

      }else{
        this.router.navigate(['login']);
      }
      this.datos_cliente = this.data.datos_cliente;
      this.datos_suministro = this.data.datos_suministro;

      this.suministro_service.getContactosCliente(this.datos_cliente).subscribe(
        data=>{
          this.datos_contacto_input = data;
        }
      );

    this.atencionService.getMotivosAtencionesGC().subscribe(
      data => {
        this.list_motivo_atenciones = data;
      });


      this.atencionService.getTiposAtencionesGC().subscribe(
        data => {
          this.list_tipo_atenciones = data;
        });



        var cliente = this.data.cliente;

        if(cliente == 'cli'){
          this.clienteService._datoscontactos_cli.subscribe(response => {
            this.datos_contacto = response;
          });
        }else{
          this.clienteService._datoscontactos.subscribe(response => {
            this.datos_contacto = response;
          });

        }


  }


  getMotivoAtn(ob: any){

    this.form_atencion.controls["ap_nombre"].setValue('');
    this.form_atencion.controls["ap_profesion"].setValue('');
    this.form_atencion.controls["ap_dui"].setValue('');
    this.form_atencion.controls["ap_nit"].setValue('');
    this.form_atencion.controls["ap_domicilio"].setValue('');
    this.form_atencion.controls["ap_departamento"].setValue('');
    this.form_atencion.controls["ap_actua"].setValue('');

    let datos : MotivoAtenciones = new MotivoAtenciones();
    datos.id = ob;


    let datos_nis : Atenciones = new Atenciones();
    datos_nis.cliente = this.form_atencion.controls["suministro"].value;

    this.motivoatn_service.getSistemaMotivoAtn(datos).subscribe(
      response => {
        this.sistema_motivoatn = response.sistema;
      },
      err=>{},
      ()=>{}
    );

    let datos_carta : MttoCartas = new MttoCartas();
    datos_carta.id = ob;

    this.mttocartas_service.getClausulaAclaratoria(datos_carta).subscribe(
      response => {
        this.clausula_atn = response.parrafo;
        this.titulo_atn = response.titulo;
        this.tipo_persona = response.tipo_persona;
        console.log(response.tipo_persona);


      },
      err=>{},
      ()=>{
        if(this.tipo_persona == 'Natural'){
          this.tipo_persona_validar = false;
         }
         else if(this.tipo_persona == 'Jurídica'){
          this.tipo_persona_validar = true;


          this.atencionService.getDatosApoderado(datos_nis).subscribe(
            data=>{
              this.datos_repre = data;
            },
            err=>{},
            ()=>{}
          );

         }else{
          this.tipo_persona_validar = false;
         }

        this.form_atencion.controls["titulo_atn"].setValue(this.titulo_atn);
        this.form_atencion.controls["descripcion_atencion"].setValue(this.clausula_atn);
      }
    );





  }


  mostrarDatos(){
    var opcion = this.form_atencion.controls["tipo_atencion"].value;

    if(opcion === '2'){
      this.tipo_atencion = 'email';
      this.form_atencion.controls["email"].setValue('');
    }

    else if(opcion === '5'){
      this.tipo_atencion = 'fax';
      this.form_atencion.controls["fax"].setValue('');
    }

    else if(opcion === '7'){
      this.tipo_atencion = 'whatsapp';
      this.form_atencion.controls["whatsapp"].setValue('');
    }else{
      this.tipo_atencion = '';
    }
  }


  cerrarModalAtn(){
    this.modal_atencion.close();
  }


  guardarAtencion(){
    let datos : Atenciones = new Atenciones();

    datos = this.form_atencion.value;

    this.arreglo_atenciones = datos;

    this.atencionService.guardarAtencion(this.arreglo_atenciones).subscribe(
      response => {
        this.atencion_id = response;
        this.atencion_id_evt = response;


          let datos_evt : Atenciones = new Atenciones();
          datos_evt.atencion_id = this.atencion_id;
          datos_evt.codigo_sucursal = this.user.codigo_sucursal;
          datos_evt.ap_nombre = this.form_atencion.controls["ap_nombre"].value;
          datos_evt.ap_profesion = this.form_atencion.controls["ap_profesion"].value;
          datos_evt.ap_dui= this.form_atencion.controls["ap_dui"].value;
          datos_evt.ap_nit= this.form_atencion.controls["ap_nit"].value;
          datos_evt.ap_domicilio= this.form_atencion.controls["ap_domicilio"].value;
          datos_evt.ap_departamento= this.form_atencion.controls["ap_departamento"].value;
          datos_evt.ap_actua= this.form_atencion.controls["ap_actua"].value;

          this.eventosService.guardarEventoGC(datos_evt).subscribe(
            response => {
            },
            err => {

            },
            () => {
              this._snackBar.open('¡¡ Atención y Macrotarea creados !!', 'Ok', {
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              });

              this.dialog.closeAll();

            });


      },
      err => {},
      () => {});
  }

}
