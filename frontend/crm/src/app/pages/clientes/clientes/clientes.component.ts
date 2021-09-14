import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Atenciones } from 'src/app/models/atenciones';
import { Clientes } from 'src/app/models/clientes';
import { AtencionesService } from 'src/app/services/atenciones.service';
import { ClientesService } from 'src/app/services/clientes.service';


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
  form_atencion : FormGroup;
  form_adjuntos : FormGroup;
  datosClientes = false;
  cargaDatos = false;
  notfound = false;
  datos_cliente : Clientes = new Clientes();
  datos_contacto : Clientes[] | undefined;
  datos_suministro : Clientes[] | undefined;
  list_motivo_atenciones : Atenciones[] | undefined;
  list_tipo_atenciones : Atenciones[] | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private clienteService : ClientesService, public atencionService: AtencionesService) {
    this.search_cliente_form = new FormGroup({
      'cliente': new FormControl('',[Validators.required])
    });

    this.form_atencion = new FormGroup({
      'suministro': new FormControl('',[Validators.required]),
      'cliente': new FormControl('',[Validators.required]),
      'contacto': new FormControl('',[Validators.required]),
      'telefono': new FormControl('',[Validators.required]),
      'tipo_atencion': new FormControl('',[Validators.required]),
      'motivo_atencion': new FormControl('',[Validators.required]),
      'descripcion_atencion': new FormControl('',[Validators.required]),
    });


    this.form_adjuntos = new FormGroup({
      'file': new FormControl('',[Validators.required])
    });


  }


  ngOnInit( ): void {

      this.atencionService.getMotivosAtenciones().subscribe(
      data => {
        this.list_motivo_atenciones = data;
      });


      this.atencionService.getTiposAtenciones().subscribe(
        data => {
          this.list_tipo_atenciones = data;
        })

    /*this.clienteService.getAllClientesEdesal().subscribe(
      data => {

        if(this.texto === '') {
          this.dataSource.data = data;
        }
        this.dataSource.data = data;
      });*/
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //Obtener datos clientes
  getClienteByName(){
    this.cargaDatos = true;
    this.notfound = false;
    this.datosClientes = false;
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
          this.datosClientes = false;
          this.notfound = true;
          this.cargaDatos = false;
        }else{


          this.clienteService.listarContactosByCliente(this.datos_cliente).subscribe(
            response => {
              this.datos_contacto = response;
            },
            err => {

            },
            () => {

            }
          );


          this.clienteService.listarSuministrosByCliente(this.datos_cliente).subscribe(
            response => {
              this.datos_suministro = response;
            },
            err => {

            },
            () => {
              this.datosClientes = true;
              this.cargaDatos = false;
            }
          );


        }

      }
    );
  }







}



