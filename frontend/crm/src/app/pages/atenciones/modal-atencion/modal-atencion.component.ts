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
import { Usuario } from 'src/app/models/usuario';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { EventosService } from 'src/app/services/eventos.service';
import { MotivoAtencionesService } from 'src/app/services/motivo-atenciones.service';
import { MttoCartasService } from 'src/app/services/mtto-cartas.service';
import { GenerarEventoComponent } from '../generar-evento/generar-evento.component';

@Component({
  selector: 'app-modal-atencion',
  templateUrl: './modal-atencion.component.html',
  styleUrls: ['./modal-atencion.component.css']
})
export class ModalAtencionComponent implements OnInit {
  datos_contacto : Clientes[] = [];
  datos_suministro : Clientes[] = [];
  list_motivo_atenciones : Atenciones[] = [];
  list_tipo_atenciones : Atenciones[] = [];
  form_atencion : FormGroup;

  datos_cliente : Clientes = new Clientes();
  tipo_atencion = '';
  user: Usuario = new Usuario();
  arreglo_atenciones: Atenciones = new Atenciones();
  atencion_id : any;
  tipo = 'atencion';
  sistema_motivoatn: any;
  clausula_atn: any;
  titulo_atn: any;
  atencion_id_evt : any;
  validarArchivos = false;

  constructor(public atencionService: AtencionesService,
    public modal_atencion: MatDialogRef<ModalAtencionComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, private _snackBar: MatSnackBar, private clienteService : ClientesService,public dialog: MatDialog,
    private motivoatn_service: MotivoAtencionesService, private eventosService: EventosService, private mttocartas_service: MttoCartasService) {
    this.form_atencion = new FormGroup({
      'codigo': new FormControl(''),
      'suministro': new FormControl(''),
      'cliente': new FormControl('',[Validators.required]),
      'contacto': new FormControl(''),
      'telefono': new FormControl(''),
      'tipo_atencion': new FormControl('',[Validators.required]),
      'motivo_atencion': new FormControl('',[Validators.required]),
      'titulo_atn': new FormControl('',[Validators.required]),
      'descripcion_atencion': new FormControl(''),
      'email' : new FormControl(''),
      'fax' : new FormControl(''),
      'whatsapp' : new FormControl(''),
      'usuario_crm' : new FormControl(''),
    });



  }

  ngOnInit(): void {


    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');

      }else{
        this.router.navigate(['login']);
      }


    this.atencionService.getMotivosAtenciones().subscribe(
      data => {
        this.list_motivo_atenciones = data;
      });


      this.atencionService.getTiposAtenciones().subscribe(
        data => {
          this.list_tipo_atenciones = data;
        });

        this.datos_cliente = this.data.datos_cliente;
        this.datos_suministro = this.data.datos_suministro;

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

        if(this.sistema_motivoatn === 'CRM'){

          this.dialog.open(GenerarEventoComponent,{
            data:{
              atencion_id: this.atencion_id, accion: 'Adjuntar archivos'
            }
          }
           );

           this.validarArchivos = true;

        }else{
          let datos_evt : Atenciones = new Atenciones();
          datos_evt.atencion_id = this.atencion_id;

          this.eventosService.guardarEventoByAtencion(datos_evt).subscribe(
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

            });
        }

      },
      err => {},
      () => {});




  }


  getMotivoAtn(ob: any){
    let datos : MotivoAtenciones = new MotivoAtenciones();
    datos.id = ob;

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
      },
      err=>{},
      ()=>{
        this.form_atencion.controls["titulo_atn"].setValue(this.titulo_atn);
        this.form_atencion.controls["descripcion_atencion"].setValue(this.clausula_atn);
      }
    );

  }





}
