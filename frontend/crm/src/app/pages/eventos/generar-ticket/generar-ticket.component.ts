import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Eventos } from 'src/app/models/eventos';
import { EventosService } from 'src/app/services/eventos.service';
import { ModalTicketComponent } from '../../tickets/modal-ticket/modal-ticket.component';

@Component({
  selector: 'app-generar-ticket',
  templateUrl: './generar-ticket.component.html',
  styleUrls: ['./generar-ticket.component.css']
})
export class GenerarTicketComponent implements OnInit {
  accion!: string;
  evento_id!: any;

  constructor( public modal: MatDialogRef<GenerarTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,   public dialog: MatDialog,
    public eventoService: EventosService) { }

  ngOnInit(): void {
    this.evento_id = this.data.evento_id;
    this.accion = this.data.accion;
  }

  generarTicket(){
    this.dialog.closeAll();

    let datos : Eventos = new Eventos();
    datos.evento_id = this.evento_id;
    this.eventoService.getDetalleEvento(datos).subscribe(
      data => {
        this.dialog.open(ModalTicketComponent,{
          data: {datos_evento: data},
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

}
