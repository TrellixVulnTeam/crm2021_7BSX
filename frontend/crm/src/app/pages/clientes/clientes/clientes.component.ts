import {AfterViewInit, Component, ViewChild,OnInit, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Atenciones } from 'src/app/models/atenciones';
import { Clientes } from 'src/app/models/clientes';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { GlobalService } from 'src/app/services/global.service';
import { ModalAtencionComponent } from '../../atenciones/modal-atencion/modal-atencion.component';
import { DetallesClienteComponent } from '../detalles-cliente/detalles-cliente.component';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nombrecliente', 'telefono', 'direccion', 'usuario', 'Acciones'];
  dataSource:any = new MatTableDataSource<any>([]);
  texto: any;
  search_cliente_form: FormGroup;
  mostrarDatos = false;
  cargaDatos = false;
  notfound = false;
  datos_cliente : Clientes = new Clientes();
  datos_contacto : Clientes[] | undefined;
  datos_suministro : Clientes[] | undefined;
  list_motivo_atenciones : Atenciones[] | undefined;
  list_tipo_atenciones : Atenciones[] | undefined;



  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private clienteService : ClientesService, public atencionService: AtencionesService,
    public dialog: MatDialog, private global: GlobalService) {
    this.search_cliente_form = new FormGroup({
      'cliente': new FormControl('',[Validators.required])
    });

  }


  ngOnInit( ): void {
    setTimeout(() => {
      this.global.fillOpcionMenu('Clientes EDESAL y conectados < 120 días');
    });


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //Obtener datos clientes
  getClienteByName(){
    this.cargaDatos = true;
    this.notfound = false;
    this.mostrarDatos = false;
    let datos : Clientes = new Clientes();

    datos = this.search_cliente_form.value;
    this.clienteService.getclientesbyname(datos).subscribe(
      response => {
        this.datos_cliente = response;
      },
      err => {
      },
      () => {
        if(Object.keys(this.datos_cliente).length === 0){
          this.mostrarDatos = false;
          this.notfound = true;
          this.cargaDatos = false;
        }else{
          this.listarContactos();
          this.listarSuministros();
        }

      }
    );



  }


  listarContactos(){


    this.clienteService.listarContactosByCliente(this.datos_cliente).subscribe(
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



  listarSuministros(){
    this.clienteService.listarSuministrosByCliente(this.datos_cliente).subscribe(
      response => {
        this.datos_suministro = response;
      },
      err => {

      },
      () => {
        this.mostrarDatos = true;
        this.cargaDatos = false;
      }
    );
  }




  open_modal_atenciones() {

    this.dialog.open(ModalAtencionComponent,{
      data: {datos_cliente: this.datos_cliente, datos_contacto: this.datos_contacto, datos_suministro: this.datos_suministro, cliente: 'edesal',},
      width: '80%',
    });

  }





}




