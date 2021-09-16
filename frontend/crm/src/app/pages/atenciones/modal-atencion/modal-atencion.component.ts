import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Atenciones } from 'src/app/models/atenciones';
import { Clientes } from 'src/app/models/clientes';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { GlobalService } from 'src/app/services/global.service';

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


  constructor(public atencionService: AtencionesService,
    public modal_atencion: MatDialogRef<ModalAtencionComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    this.form_atencion = new FormGroup({
      'codigo': new FormControl('',[Validators.required]),
      'suministro': new FormControl('',[Validators.required]),
      'cliente': new FormControl('',[Validators.required]),
      'contacto': new FormControl('',[Validators.required]),
      'telefono': new FormControl('',[Validators.required]),
      'tipo_atencion': new FormControl('',[Validators.required]),
      'motivo_atencion': new FormControl('',[Validators.required]),
      'descripcion_atencion': new FormControl('',[Validators.required]),
    });



  }

  ngOnInit(): void {
    this.atencionService.getMotivosAtenciones().subscribe(
      data => {
        this.list_motivo_atenciones = data;
      });


      this.atencionService.getTiposAtenciones().subscribe(
        data => {
          this.list_tipo_atenciones = data;
        })

        this.datos_cliente = this.data.datos_cliente;
        this.datos_suministro = this.data.datos_suministro;
        this.datos_contacto = this.data.datos_contacto;
  }

  cerrarModalAtn(){
    this.modal_atencion.close();
  }


}
