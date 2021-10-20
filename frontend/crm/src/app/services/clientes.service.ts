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
export class ClientesService {

  datoscontactos = new BehaviorSubject<Clientes[]>([]);
  _datoscontactos = this.datoscontactos.asObservable();


  datoscontactos_cli = new BehaviorSubject<Clientes[]>([]);
  _datoscontactos_cli = this.datoscontactos_cli.asObservable();


  datos_cli = new BehaviorSubject<Clientes[]>([]);
  _datos_cli = this.datos_cli.asObservable();

  datos_cli_compartidos = new BehaviorSubject<Clientes[]>([]);
  _datos_cli_compartidos = this.datos_cli_compartidos.asObservable();


  datos_contacto_creacion = new BehaviorSubject<Clientes[]>([]);
  _datos_contacto_creacion = this.datos_contacto_creacion.asObservable();

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }



  // llenar el observable de behaviour subject
  fillDatosContactos(d: Clientes[]){
    this.datoscontactos.next(d);
  }

  fillDatosContactos_cli(d: Clientes[]){
    this.datoscontactos_cli.next(d);

  }


  fillClientes_list(d: Clientes[]){
    this.datos_cli.next(d);

  }


  fillClientes_list_compartidos(d: Clientes[]){
    this.datos_cli_compartidos.next(d);

  }

  fill_contactos_creacion(d: Clientes[]){
    this.datos_contacto_creacion.next(d);
  }




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

public listarContactosByCliente_potenciales(cliente: Clientes): Observable<Clientes[]> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'listarContactosByCliente_potenciales', cliente, httpOptions)
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

public getUsuariosByCliente(cliente: Clientes): Observable<Clientes[]> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'getUsuariosByCliente', cliente, httpOptions)
  .pipe(map(data => data as unknown as Clientes[] ));
}


public getUsuariosDisponibles(cliente: Clientes): Observable<Clientes[]> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'getUsuariosDisponibles', cliente, httpOptions)
  .pipe(map(data => data as unknown as Clientes[] ));
}


public guardarUsuario(datos: Clientes): Observable<Clientes> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'guardarUsuario', datos, httpOptions)
  .pipe(map(data => data as Clientes ));
}


public eliminarUsuario(datos: Clientes): Observable<Clientes> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'eliminarUsuario', datos, httpOptions)
  .pipe(map(data => data as Clientes ));
}


public guardarContacto(datos: Clientes): Observable<Clientes> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'guardarContacto', datos, httpOptions)
  .pipe(map(data => data as Clientes ));
}

public eliminarcontacto(datos: Clientes): Observable<Clientes> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'eliminarcontacto', datos, httpOptions)
  .pipe(map(data => data as Clientes ));
}

public eliminarcontacto_prospectos(datos: Clientes): Observable<Clientes> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'eliminarcontacto_prospectos', datos, httpOptions)
  .pipe(map(data => data as Clientes ));
}




public editarContacto(datos: Clientes): Observable<Clientes> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'editarContacto', datos, httpOptions)
  .pipe(map(data => data as Clientes ));
}


public guardarContacto_prospectos(datos: Clientes): Observable<Clientes> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'guardarContacto_prospectos', datos, httpOptions)
  .pipe(map(data => data as Clientes ));
}

public guardarInformacion_Clientes(datos: Clientes): Observable<Clientes> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'guardarInformacion_Clientes', datos, httpOptions)
  .pipe(map(data => data as Clientes ));
}

public guardarCliente_prospectos(datos: Clientes): Observable<Clientes> {
  return this.http.post<Clientes>(this.globalservice.getUrlBackEnd() + 'guardarCliente_prospectos', datos, httpOptions)
  .pipe(map(data => data as Clientes ));
}

public guardar_contactos_cliente(datos: Clientes[]): Observable<Clientes[]> {
  return this.http.post<Clientes[]>(this.globalservice.getUrlBackEnd() + 'guardar_contactos_cliente', datos, httpOptions)
  .pipe(map(data => data as Clientes[] ));
}


public guardar_usuarios_cliente(datos: Clientes[]): Observable<Clientes[]> {
  return this.http.post<Clientes[]>(this.globalservice.getUrlBackEnd() + 'guardar_usuarios_cliente', datos, httpOptions)
  .pipe(map(data => data as Clientes[] ));
}


 //metodo para obtener objeto de usuarios para select
 public getAllUsuariosDisponibles(): Observable<Clientes[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getAllUsuariosDisponibles').pipe(map(data => data as Clientes[]));
}

public getClientesAtenciones(): Observable<any> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getClientesAtenciones').pipe(map(data => data as any));
}

public getHistorialCliente(cliente: Clientes): Observable<Atenciones[]> {
  return this.http.post<Atenciones>(this.globalservice.getUrlBackEnd() + 'getHistorialCliente', cliente, httpOptions)
  .pipe(map(data => data as unknown as Atenciones[] ));
}

}
