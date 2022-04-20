import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Atenciones } from 'src/app/models/atenciones';
import { Eventos } from 'src/app/models/eventos';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { EventosService } from 'src/app/services/eventos.service';
import { ModalEventoComponent } from '../../eventos/modal-evento/modal-evento.component';
import { ModalTicketComponent } from '../../tickets/modal-ticket/modal-ticket.component';

@Component({
  selector: 'app-generar-evento',
  templateUrl: './generar-evento.component.html',
  styleUrls: ['./generar-evento.component.css']
})
export class GenerarEventoComponent implements OnInit {
  accion!: string;
  atencion_id!: any;
  eventoService: any;
  evento_id!: any;


  constructor( public modal: MatDialogRef<GenerarEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,   public dialog: MatDialog,
    private atencionService: AtencionesService, private eventosService: EventosService
    ) { }

  ngOnInit(): void {
    this.atencion_id = this.data.atencion_id;
    this.accion = this.data.accion;

  }


  generarEvento(){
    this.dialog.closeAll();

    let datos : Atenciones = new Atenciones();
    datos.atencion_id = this.atencion_id;
    this.atencionService.getDetalleAtencion(datos).subscribe(
      data => {
        this.dialog.open(ModalEventoComponent,{
          data: {datos_atencion: data},
          width: '80%',
        });
      }
    );
  }

  cerrarModal(){
    if(this.accion=="finalizar evento"){
      this.dialog.closeAll();
    }else{
      this.modal.close();
    }
  }


  cerrarModalTodos(){
    this.dialog.closeAll();
  }


  generarTicket(){
    this.dialog.closeAll();

    let datos : Atenciones = new Atenciones();
    datos.atencion_id = this.atencion_id;





      this.eventosService.guardarEventoByAtencion(datos).subscribe(
        response => {this.evento_id = response;},
        err => {},
        () => {
          let datos1 : Eventos = new Eventos();
          datos1.evento_id = this.evento_id;


          this.eventosService.getDetalleEvento(datos1).subscribe(
            response => {
              this.dialog.open(ModalTicketComponent,{
                data: {datos_evento: response},
                width: '80%',
              });
            },
            err => {},
            () => {});
        });






  }

}
