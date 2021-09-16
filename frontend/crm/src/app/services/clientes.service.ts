import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clientes } from '../models/clientes';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


  //metodo para obtener objeto de usuarios para select
  public getAllClientesEdesal(): Observable<Clientes[]> {
   return this.http.get(this.globalservice.getUrlBackEnd() + 'getAllClientesEdesal').pipe(map(data => data as Clientes[]));
 }

 public getclientesbyname(cliente: Clientes): Observable<Clientes> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'getclientesbyname', cliente, httpOptions)
  .pipe(map(data => data as Clientes ));
}

public listarContactosByCliente(cliente: Clientes): Observable<Clientes[]> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'listarContactosByCliente', cliente, httpOptions)
  .pipe(map(data => data as unknown as Clientes[] ));
}

public listarSuministrosByCliente(cliente: Clientes): Observable<Clientes[]> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'listarSuministrosByCliente', cliente, httpOptions)
  .pipe(map(data => data as unknown as Clientes[] ));
}


public getProspectosStakeholders(usuario: Usuario): Observable<Usuario[]> {
  return this.http.post<Usuario>(this.globalservice.getUrlBackEnd() + 'getProspectosStakeholders', usuario, httpOptions)
  .pipe(map(data => data as unknown as Usuario[] ));
}


public getClientesCompartidos(usuario: Usuario): Observable<Usuario[]> {
  return this.http.post<Usuario>(this.globalservice.getUrlBackEnd() + 'getClientesCompartidos', usuario, httpOptions)
  .pipe(map(data => data as unknown as Usuario[] ));
}


public getContactosPotenciales(cliente: Clientes): Observable<Clientes[]> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'getContactosPotenciales', cliente, httpOptions)
  .pipe(map(data => data as unknown as Clientes[] ));
}

}
