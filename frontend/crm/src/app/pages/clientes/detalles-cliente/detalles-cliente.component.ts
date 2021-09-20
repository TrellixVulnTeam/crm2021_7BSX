import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Clientes } from 'src/app/models/clientes';
import { ModalAtencionComponent } from '../../atenciones/modal-atencion/modal-atencion.component';

@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css']
})
export class DetallesClienteComponent implements OnInit {
  @Input() datos_cliente : Clientes = new Clientes();
  @Input() mostrarDatos : any;
  @Input() cargaDatos : any;
  @Input() notfound : any;
  @Input() datos_contacto : Clientes[] | undefined;;
  @Input() datos_suministro : Clientes[] | undefined;;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  open_modal_atenciones() {

    this.dialog.open(ModalAtencionComponent,{
      data: {datos_cliente: this.datos_cliente, datos_contacto: this.datos_contacto, datos_suministro: this.datos_suministro}
    });

  }



}
