import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Atenciones } from 'src/app/models/atenciones';
import { Clientes } from 'src/app/models/clientes';
import { Usuario } from 'src/app/models/usuario';
import { ClientesService } from 'src/app/services/clientes.service';
import { GlobalService } from 'src/app/services/global.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HistorialClienteComponent } from '../historial-cliente/historial-cliente.component';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  frm_rpt_cliente: FormGroup;
  frm_rpt_usuario: FormGroup;
  frm_rpt_global: FormGroup;
  usuario_listado: Usuario[] = [];
  atenciones_cliente : Atenciones[]=[];
  selectedData!: { value: any; text: string; };

  constructor(private global: GlobalService, private userService: UsuarioService, private clienteService: ClientesService,
    public dialog: MatDialog, private rpt_service: ReportesService) {
    this.frm_rpt_cliente = new FormGroup({
      'cliente': new FormControl(''),
    });

    this.frm_rpt_usuario = new FormGroup({
      'usuario': new FormControl('', Validators.required),
      'fecha_inicio': new FormControl('',  [Validators.required]),
      'fecha_fin': new FormControl('',  [Validators.required]),
    });

    this.frm_rpt_global = new FormGroup({
      'fecha_inicio': new FormControl('', [Validators.required]),
      'fecha_fin': new FormControl('', [Validators.required]),
    });
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.global.fillOpcionMenu('Reportes CRM');
    });

    this.userService.getUsuarios().subscribe(
      data =>{
        this.usuario_listado = data;
      }
    )

  }


  getHistorialCliente(){

    let datos : Clientes = new Clientes();
    datos = this.frm_rpt_cliente.value;

    this.rpt_service.getHistorialCliente(datos).subscribe(
      data => {
        this.dialog.open(HistorialClienteComponent,{
          data: {listado_atenciones: data, titulo: 'Historial de atenciones del cliente: ', subtitulo: this.frm_rpt_cliente.controls["cliente"].value},
          width: '80%',
        });
      }
    );

  }


  getSelectText(event: MatSelectChange) {
    this.selectedData = {
      value: event.value,
      text: event.source.triggerValue
    };

  }

  generarRptUsuario(){
    let  datos : Usuario = new Usuario();

   var username = this.selectedData?.text;

    datos = this.frm_rpt_usuario.value;

    this.rpt_service.getUsuarioRpt(datos).subscribe(
      data => {
        this.dialog.open(HistorialClienteComponent,{
          data: {listado_atenciones: data, titulo: 'Atenciones generadas por el usuario : ' , subtitulo: username},
          width: '80%',
        });
      }
    )
  }


  generarRptGlobal(){
      let  datos : Usuario = new Usuario();

    // var username = this.selectedData?.text;

      datos = this.frm_rpt_global.value;

      this.rpt_service.generarRptGlobal(datos).subscribe(
        data => {
          this.dialog.open(HistorialClienteComponent,{
            data: {listado_atenciones: data, titulo: 'Historial' , subtitulo: ''},
            width: '80%',
          });
        }
      )

  }

}
