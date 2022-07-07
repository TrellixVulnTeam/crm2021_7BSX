import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atenciones } from '../models/atenciones';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { Eventos } from '../models/eventos';
import { Clientes } from '../models/clientes';

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

  datos_atnTodasgc = new BehaviorSubject<Atenciones[]>([]);
  _datos_atnTodasgc = this.datos_atnTodasgc.asObservable();

  fillatnTodas_listgc(d: Atenciones[]){
    this.datos_atnTodasgc.next(d);
  }


  datos_atnAbiertasgc = new BehaviorSubject<Atenciones[]>([]);
  _datos_atnAbiertasgc = this.datos_atnAbiertasgc.asObservable();

  fillatnAbiertas_listgc(d: Atenciones[]){
    this.datos_atnAbiertasgc.next(d);
  }



  datos_atnCerradasgc = new BehaviorSubject<Atenciones[]>([]);
  _datos_atnCerradasgc = this.datos_atnCerradasgc.asObservable();

  fillatnCerradas_listgc(d: Atenciones[]){
    this.datos_atnCerradasgc.next(d);
  }



  //gestiones


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

  public getMotivosAtencionesGC(): Observable<Atenciones[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getMotivosAtencionesGC').pipe(map(data => data as Atenciones[]));
  }


  public getMotivosAtencionesAll(): Observable<Atenciones[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getMotivosAtencionesAll').pipe(map(data => data as Atenciones[]));
  }



  //metodo para obtener objeto de tipos de atenciones para select
  public getTiposAtencionesGC(): Observable<Atenciones[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getTiposAtencionesGC').pipe(map(data => data as Atenciones[]));
  }





  //metodo para obtener objeto de tipos de atenciones para select
  public getTiposAtenciones(): Observable<Atenciones[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getTiposAtenciones').pipe(map(data => data as Atenciones[]));
  }


  public getTiposAtencionesAll(): Observable<Atenciones[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getTiposAtencionesAll').pipe(map(data => data as Atenciones[]));
  }


  public guardarAtencion(atencion: Atenciones): Observable<Atenciones> {
    return this.http.post<Atenciones>(this.globalservice.getUrlBackEnd() + 'guardarAtencion', atencion, httpOptions)
    .pipe(map(data => data as Atenciones ));
  }


  public getAllAtencionesGC(usuario: Usuario): Observable<Atenciones[]> {
    return this.http.post<Atenciones>(this.globalservice.getUrlBackEnd() + 'getAllAtencionesGC', usuario, httpOptions)
    .pipe(map(data => data as unknown as Atenciones[] ));
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





  public getDatosApoderado(data: Atenciones): Observable<Atenciones> {
    return this.http.post<Atenciones>(this.globalservice.getUrlBackEnd() + 'getDatosApoderado', data, httpOptions)
    .pipe(map(data => data as unknown as Atenciones ));
  }


  public cerrarAtencion(atn: Atenciones): Observable<Atenciones[]> {
    return this.http.post<Atenciones>(this.globalservice.getUrlBackEnd() + 'cerrarAtencion', atn, httpOptions)
    .pipe(map(data => data as unknown as Atenciones[] ));
  }



}
