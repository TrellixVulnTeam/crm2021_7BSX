import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atenciones } from '../models/atenciones';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { Eventos } from '../models/eventos';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};

@Injectable({
  providedIn: 'root'
})
export class AtencionesService {

  datos_atnTodas = new BehaviorSubject<Atenciones[]>([]);
  _datos_atnTodas = this.datos_atnTodas.asObservable();

  fillatnTodas_list(d: Atenciones[]){
    this.datos_atnTodas.next(d);
  }


  datos_atnAbiertas = new BehaviorSubject<Atenciones[]>([]);
  _datos_atnAbiertas = this.datos_atnAbiertas.asObservable();

  fillatnAbiertas_list(d: Atenciones[]){
    this.datos_atnAbiertas.next(d);
  }



  datos_atnCerradas = new BehaviorSubject<Atenciones[]>([]);
  _datos_atnCerradas = this.datos_atnCerradas.asObservable();

  fillatnCerradas_list(d: Atenciones[]){
    this.datos_atnCerradas.next(d);
  }

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


  //metodo para obtener objeto de motivos de atenciones para select
  public getMotivosAtenciones(): Observable<Atenciones[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getMotivosAtenciones').pipe(map(data => data as Atenciones[]));
  }


  //metodo para obtener objeto de tipos de atenciones para select
  public getTiposAtenciones(): Observable<Atenciones[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getTiposAtenciones').pipe(map(data => data as Atenciones[]));
  }


  public guardarAtencion(atencion: Atenciones): Observable<Atenciones> {
    return this.http.post<Atenciones>(this.globalservice.getUrlBackEnd() + 'guardarAtencion', atencion, httpOptions)
    .pipe(map(data => data as Atenciones ));
  }

  public getAllAtenciones(usuario: Usuario): Observable<Atenciones[]> {
    return this.http.post<Atenciones>(this.globalservice.getUrlBackEnd() + 'getAllAtenciones', usuario, httpOptions)
    .pipe(map(data => data as unknown as Atenciones[] ));
  }


  public getDetalleAtencion(id_atn: Atenciones): Observable<Atenciones[]> {
    return this.http.post<Atenciones>(this.globalservice.getUrlBackEnd() + 'getDetalleAtencion', id_atn, httpOptions)
    .pipe(map(data => data as unknown as Atenciones[] ));
  }
  public getConteoAtencion(id: Usuario): Observable<Atenciones> {
    return this.http.post<Atenciones>(this.globalservice.getUrlBackEnd() + 'getConteoAtencion', id, httpOptions)
    .pipe(map(data => data as unknown as Atenciones ));
  }

  public getUsuariosAtenciones(): Observable<any> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getUsuariosAtenciones').pipe(map(data => data as any));
  }


  public getEventosPendientes(atn: Atenciones): Observable<Eventos[]> {
    return this.http.post<Eventos>(this.globalservice.getUrlBackEnd() + 'getEventosPendientes', atn, httpOptions)
    .pipe(map(data => data as unknown as Eventos[] ));
  }





}
