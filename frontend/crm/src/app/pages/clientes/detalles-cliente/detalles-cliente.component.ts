import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clientes } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/clientes.service';
import { ModalAtencionComponent } from '../../atenciones/modal-atencion/modal-atencion.component';
import { EditarContactoComponent } from '../editar-contacto/editar-contacto.component';
import { NuevoContactoComponent } from '../nuevo-contacto/nuevo-contacto.component';

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
  @Input() datos_contacto : Clientes[] | undefined;
  @Input() datos_suministro : Clientes[] | undefined;
  datos_contactos: Clientes[] = [];


  constructor(public dialog: MatDialog, private clienteService : ClientesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.clienteService._datoscontactos.subscribe(
      response => {
        this.datos_contactos = response;
      }
    )
  }


  open_modal_atenciones() {

    this.dialog.open(ModalAtencionComponent,{
      data: {datos_cliente: this.datos_cliente, datos_contacto: this.datos_contacto, datos_suministro: this.datos_suministro},
      width: '80%',
    });

  }


  open_modal_contacto() {

    this.dialog.open(NuevoContactoComponent,{
      data: {datos_cliente: this.datos_cliente},
      width: '80%',
    });
  }


  editarcontacto(dato: Clientes){
    this.dialog.open(EditarContactoComponent,{
      data: {datos_cliente: this.datos_cliente, datos_contacto: dato},
      width: '80%',
    });
  }


  listarContactos(datos : any){
    this.clienteService.listarContactosByCliente(datos).subscribe(
      response => {
        this.datos_contacto = response;

        this.clienteService.fillDatosContactos(response);

        this.clienteService._datoscontactos.subscribe(response => {
        });
      },
      err => {

      },
      () => {

      }
    );
  }



  eliminarcontacto(datos: Clientes){

    let data : Clientes = new Clientes();
    data.codigo = datos.codigo_cliente;
    data.correla_contacto = datos.correla_contacto;


    this.clienteService.eliminarcontacto(data).subscribe(
      response => {
        //this.usuarios_disponibles = response;
      },
      err => {
        this._snackBar.open('¡¡ Error !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

      },
      () => {

        this.listarContactos(data);

        this._snackBar.open('¡¡ Datos Guardados !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });

        this.dialog.closeAll();

      });

  }

}
