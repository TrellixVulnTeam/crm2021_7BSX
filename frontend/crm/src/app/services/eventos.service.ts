import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Eventos } from '../models/eventos';
import { Usuario } from '../models/usuario';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tickets } from '../models/tickets';
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
export class EventosService {

  datos_evtTodos = new BehaviorSubject<Eventos[]>([]);
  _datos_evtTodos = this.datos_evtTodos.asObservable();

  fillevtTodos_list(d: Eventos[]){
    this.datos_evtTodos.next(d);
  }



  datos_evtAbiertos = new BehaviorSubject<Eventos[]>([]);
  _datos_evtAbiertos = this.datos_evtAbiertos.asObservable();

  fillevtAbiertos_list(d: Eventos[]){
    this.datos_evtAbiertos.next(d);
  }


  datos_evtProResolucion = new BehaviorSubject<Eventos[]>([]);
  _datos_evtProResolucion = this.datos_evtProResolucion.asObservable();

  fillevtProResolucion_list(d: Eventos[]){
    this.datos_evtProResolucion.next(d);
  }


  datos_evtCerrados = new BehaviorSubject<Eventos[]>([]);
  _datos_evtCerrados = this.datos_evtCerrados.asObservable();

  fillevtCerrados_list(d: Eventos[]){
    this.datos_evtCerrados.next(d);
  }


  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }



  public getAllEventos(usuario: Usuario): Observable<Eventos[]> {
    return this.http.post<Eventos>(this.globalservice.getUrlBackEnd() + 'getAllEventos', usuario, httpOptions)
    .pipe(map(data => data as unknown as Eventos[] ));
  }

  public guardarEvento(evento: Eventos): Observable<Eventos> {
    return this.http.post<Eventos>(this.globalservice.getUrlBackEnd() + 'guardarEvento', evento, httpOptions)
    .pipe(map(data => data as Eventos ));
  }

  public guardarEventoByAtencion(atn: Atenciones): Observable<Eventos> {
    return this.http.post<Eventos>(this.globalservice.getUrlBackEnd() + 'guardarEventoByAtencion', atn, httpOptions)
    .pipe(map(data => data as Eventos ));
  }


  public getDetalleEvento(evt: Eventos): Observable<Eventos[]> {
    return this.http.post<Eventos>(this.globalservice.getUrlBackEnd() + 'getDetalleEvento', evt, httpOptions)
    .pipe(map(data => data as unknown as Eventos[] ));
  }

  public getEventosAsociados(evt: Eventos): Observable<Eventos[]> {
    return this.http.post<Eventos>(this.globalservice.getUrlBackEnd() + 'getEventosAsociados', evt, httpOptions)
    .pipe(map(data => data as unknown as Eventos[] ));
  }

  public getConteoEvento(id: Usuario): Observable<Eventos> {
    return this.http.post<Eventos>(this.globalservice.getUrlBackEnd() + 'getConteoEvento', id, httpOptions)
    .pipe(map(data => data as unknown as Eventos ));
  }

  public getUsuariosEventos(): Observable<any> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getUsuariosEventos').pipe(map(data => data as any));
  }

  public getTicketsPendientes(evt: Eventos): Observable<Tickets[]> {
    return this.http.post<Tickets>(this.globalservice.getUrlBackEnd() + 'getTicketsPendientes', evt, httpOptions)
    .pipe(map(data => data as unknown as Tickets[] ));
  }

  public guardarResolucion(evt: Eventos): Observable<Eventos[]> {
    return this.http.post<Eventos>(this.globalservice.getUrlBackEnd() + 'guardarResolucion', evt, httpOptions)
    .pipe(map(data => data as unknown as Eventos[] ));
  }


  public guardarEventoGC(evento: Eventos): Observable<Eventos> {
    return this.http.post<Eventos>(this.globalservice.getUrlBackEnd() + 'guardarEventoGC', evento, httpOptions)
    .pipe(map(data => data as Eventos ));
  }

}
