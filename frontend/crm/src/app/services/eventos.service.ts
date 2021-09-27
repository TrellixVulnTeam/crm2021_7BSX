import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Eventos } from '../models/eventos';
import { Usuario } from '../models/usuario';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}
