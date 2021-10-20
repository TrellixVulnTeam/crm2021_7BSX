import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Atenciones } from 'src/app/models/atenciones';
import { Clientes } from 'src/app/models/clientes';
import { Usuario } from 'src/app/models/usuario';
import { ClientesService } from 'src/app/services/clientes.service';
import { GlobalService } from 'src/app/services/global.service';
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


  constructor(private global: GlobalService, private userService: UsuarioService, private clienteService: ClientesService,
    public dialog: MatDialog) {
    this.frm_rpt_cliente = new FormGroup({
      'cliente': new FormControl(''),
    });

    this.frm_rpt_usuario = new FormGroup({
      'usuario': new FormControl(''),
      'fecha_inicio': new FormControl(''),
      'fecha_fin': new FormControl(''),
    });

    this.frm_rpt_global = new FormGroup({
      'usuario': new FormControl(''),
      'fecha_inicio': new FormControl(''),
      'fecha_fin': new FormControl(''),
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

    this.clienteService.getHistorialCliente(datos).subscribe(
      data => {
        this.dialog.open(HistorialClienteComponent,{
          data: {listado_atenciones: data},
          width: '80%',
        });
      }
    );

  }

}
