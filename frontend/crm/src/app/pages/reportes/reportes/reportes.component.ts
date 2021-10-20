import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { GlobalService } from 'src/app/services/global.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(private global: GlobalService, private userService: UsuarioService) {
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

}
