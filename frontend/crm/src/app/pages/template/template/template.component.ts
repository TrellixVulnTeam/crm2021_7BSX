import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Router } from '@angular/router';
import { Atenciones } from 'src/app/models/atenciones';
import { Eventos } from 'src/app/models/eventos';
import { Tickets } from 'src/app/models/tickets';
import { Usuario } from 'src/app/models/usuario';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { EventosService } from 'src/app/services/eventos.service';
import { GlobalService } from 'src/app/services/global.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { ClientesService } from 'src/app/services/clientes.service';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  user: Usuario = new Usuario();
  atenciones : Atenciones = new Atenciones();
  eventos : Eventos = new Eventos();
  tickets : Tickets = new Tickets();
  dataUsuarioAtn: any;
  dataUsuarioEv: any;

  type_grafica1: any;
  options_grafica1: any;
  data_grafica1: any;


  type_grafica2: any;
  options_grafica2: any;
  data_grafica2: any;

  constructor(private global: GlobalService,private router: Router, private atencionesService: AtencionesService,
    private eventoService: EventosService, private ticketService: TicketsService, private clienteService: ClientesService) { }

  ngOnInit(): void {

    this.generarGraficaUsuariosAtenciones();
    this.generarGraficaClientes();

    setTimeout(() => {
      this.global.fillOpcionMenu('Inicio');
    });

    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');

      this.atencionesService.getConteoAtencion(this.user).subscribe(
        data=>{
          this.atenciones = data;
        }
      );


      this.eventoService.getConteoEvento(this.user).subscribe(
        data=>{
          this.eventos = data;
        }
      );

      this.ticketService.getConteoTickets(this.user).subscribe(
        data=>{
          this.tickets = data;
        }
      );

    }else{
      this.router.navigate(['login']);
    }

  }


  verAtenciones(){
    this.router.navigate(['dashboard/atenciones']);
  }

  verEventos(){
    this.router.navigate(['dashboard/eventos']);
  }

  verTickets(){
    this.router.navigate(['dashboard/tickets']);
  }



  generarGraficaUsuariosAtenciones(){
    this.atencionesService.getUsuariosAtenciones().subscribe(
      data=>{
        this.dataUsuarioAtn = data;
        let usuarios: any[] = [];
        let cantidadAtn: any[] = [];


        this.dataUsuarioAtn.forEach((element: { [x: string]: any; }) => {
          usuarios.push(element["usuario"]);
          cantidadAtn.push(element["atenciones"]);

        });

        this.type_grafica1 = 'bar';
        this.data_grafica1 = {
          labels: usuarios,
          datasets: [{
            label: 'Cantidad de atenciones',
            data: cantidadAtn,
            backgroundColor: [
              "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850",
              "#F54A88","#80F29F","#FD9F46","#9946FD","#FA0707",
              "#02E5C3","#98F54A","#F5714A","#F5F24A","#80BEF2",
              "#05FC05","#FCD705","#FC5F05","#05FC7D", "#0566FC",
              "#02E5C3","#98F54A","#F5714A","#F5F24A","#80BEF2",
              "#F54A88","#80F29F","#FD9F46","#9946FD","#FA0707",
              "#CAFADB","#F8BAA1","#A1F8DB","#D2A1F8","#F8A1B5",
              "#05FC05","#FCD705","#FC5F05","#05FC7D", "#0566FC"],
          }]
        };
        this.options_grafica1 = {
          responsive: true
        };

      }
    );
  }

  generarGraficaClientes(){
    this.clienteService.getClientesAtenciones().subscribe(
      data=>{
        this.dataUsuarioEv = data;
        let clienteAt: any[] = [];
        let atencionesCl: any[] = [];


        this.dataUsuarioEv.forEach((element: { [x: string]: any; }) => {
          clienteAt.push(element["cliente"]);
          atencionesCl.push(element["atenciones"]);

        });

        this.type_grafica2 = 'bar';
        this.data_grafica2 = {
          labels: clienteAt,
          datasets: [{
            label: 'Cantidad de atenciones al cliente',
            data: atencionesCl,
            backgroundColor: [
              "#F8BAA1","#FCD705","#FC5F05","#05FC7D", "#0566FC",
              "#CAFADB","#F8BAA1","#A1F8DB","#D2A1F8","#F8A1B5",
              "#02E5C3","#98F54A","#F5714A","#F5F24A","#80BEF2",
              "#05FC05","#FCD705","#FC5F05","#05FC7D", "#0566FC",
              "#02E5C3","#98F54A","#F5714A","#F5F24A","#80BEF2",
              "#F54A88","#80F29F","#FD9F46","#9946FD","#FA0707",
              "#CAFADB","#F8BAA1","#A1F8DB","#D2A1F8","#F8A1B5",
              "#05FC05","#FCD705","#FC5F05","#05FC7D", "#0566FC"],
          }]
        };
        this.options_grafica2 = {
          responsive: true
        };

      }
    );
  }

}
