import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Suministros } from 'src/app/models/suministros';

@Component({
  selector: 'app-detalles-suministro',
  templateUrl: './detalles-suministro.component.html',
  styleUrls: ['./detalles-suministro.component.css']
})
export class DetallesSuministroComponent implements OnInit {
  FormSuministro: FormGroup;
  datos_suministro: Suministros = new Suministros();
  datos_historico: Suministros[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.FormSuministro = new FormGroup({
      'nis': new FormControl('',),
      'codigo_cliente': new FormControl('',),
      'cliente': new FormControl('',),
      'direccion': new FormControl('',),
      'tarifa': new FormControl('',),
      'capacidadmaxima': new FormControl('',),
      'tipo_tension': new FormControl('',),
      'descuento': new FormControl('',),
      'voltaje': new FormControl('',),
      'tipo_ubicacion': new FormControl('',),
      'fecha_baja': new FormControl('',),
      'fecha_alta': new FormControl('',),
    });
  }

  ngOnInit(): void {
    this.datos_suministro = this.data.datos_suministro;
    this.datos_historico = this.data.datos_historico;
  }

}
