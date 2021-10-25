import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clientes } from '../models/clientes';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { Atenciones } from '../models/atenciones';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


  public getHistorialCliente(cliente: Clientes): Observable<Atenciones[]> {
    return this.http.post<Atenciones>(this.globalservice.getUrlBackEnd() + 'getHistorialCliente', cliente, httpOptions)
    .pipe(map(data => data as unknown as Atenciones[] ));
  }


  public getUsuarioRpt(usuario: Usuario): Observable<Atenciones[]> {
    return this.http.post<Atenciones>(this.globalservice.getUrlBackEnd() + 'getUsuarioRpt', usuario, httpOptions)
    .pipe(map(data => data as unknown as Atenciones[] ));
  }

  public generarRptGlobal(usuario: Usuario): Observable<Atenciones[]> {
    return this.http.post<Atenciones>(this.globalservice.getUrlBackEnd() + 'generarRptGlobal', usuario, httpOptions)
    .pipe(map(data => data as unknown as Atenciones[] ));
  }

}
