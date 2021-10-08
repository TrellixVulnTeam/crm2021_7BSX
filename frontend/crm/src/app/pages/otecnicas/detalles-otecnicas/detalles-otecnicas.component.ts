import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Otecnicas } from 'src/app/models/otecnicas';

@Component({
  selector: 'app-detalles-otecnicas',
  templateUrl: './detalles-otecnicas.component.html',
  styleUrls: ['./detalles-otecnicas.component.css']
})
export class DetallesOtecnicasComponent implements OnInit {
  FormOrden: FormGroup;
  detalles_orden: Otecnicas = new Otecnicas();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.FormOrden = new FormGroup({
      'trabajo': new FormControl('',),
      'fecha_solicitud': new FormControl('',),
      'fecha_resolucion': new FormControl('',),
      'direccion': new FormControl('',),
      'solicitante': new FormControl('',),
      'gerencia': new FormControl('',),
      'observaciones_soli': new FormControl('',),
      'observaciones_ejec': new FormControl('',),
    });
  }

  ngOnInit(): void {
    this.detalles_orden = this.data.detalles_orden;
  }

}
