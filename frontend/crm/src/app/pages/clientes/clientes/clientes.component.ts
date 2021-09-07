import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from 'src/app/models/clientes';
import { ClientesService } from 'src/app/services/clientes.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nombrecliente', 'telefono', 'direccion', 'usuario'];
  dataSource:any = new MatTableDataSource<any>([]);
  texto: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private clienteService : ClientesService) { }


  ngOnInit( ): void {

    this.clienteService.getAllClientesEdesal().subscribe(
      data => {

        if(this.texto === '') {
          this.dataSource.data = data;
        }
        this.dataSource.data = data;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
