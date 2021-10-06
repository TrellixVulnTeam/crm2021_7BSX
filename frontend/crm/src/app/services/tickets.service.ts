import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tickets } from '../models/tickets';
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
export class TicketsService {

  datos_tckTodos = new BehaviorSubject<Tickets[]>([]);
  _datos_tckTodos = this.datos_tckTodos.asObservable();

  filltckTodos_list(d: Tickets[]){
    this.datos_tckTodos.next(d);
  }

  datos_tckGenerados = new BehaviorSubject<Tickets[]>([]);
  _datos_tckGenerados = this.datos_tckGenerados.asObservable();

  filltckGenerados_list(d: Tickets[]){
    this.datos_tckGenerados.next(d);
  }


  datos_tckProResolucion = new BehaviorSubject<Tickets[]>([]);
  _datos_tckProResolucion = this.datos_tckProResolucion.asObservable();

  filltckProResolucion_list(d: Tickets[]){
    this.datos_tckProResolucion.next(d);
  }


  datos_tckSolucionados = new BehaviorSubject<Tickets[]>([]);
  _datos_tckSolucionados = this.datos_tckSolucionados.asObservable();

  filltckSolucionados_list(d: Tickets[]){
    this.datos_tckSolucionados.next(d);
  }


  datos_tckRechazados = new BehaviorSubject<Tickets[]>([]);
  _datos_tckRechazados = this.datos_tckRechazados.asObservable();

  filltckRechazados_list(d: Tickets[]){
    this.datos_tckRechazados.next(d);
  }


  datos_tckCerrados = new BehaviorSubject<Tickets[]>([]);
  _datos_tckCerrados = this.datos_tckCerrados.asObservable();

  filltckCerrados_list(d: Tickets[]){
    this.datos_tckCerrados.next(d);
  }

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


  public getAllTickets(usuario: Usuario): Observable<Tickets[]> {
    return this.http.post<Tickets>(this.globalservice.getUrlBackEnd() + 'getAllTickets', usuario, httpOptions)
    .pipe(map(data => data as unknown as Tickets[] ));
  }

  public guardarTicket(ticket: Tickets): Observable<Tickets> {
    return this.http.post<Tickets>(this.globalservice.getUrlBackEnd() + 'guardarTicket', ticket, httpOptions)
    .pipe(map(data => data as Tickets ));
  }

  public guardarTicketOrder(ticket: Tickets): Observable<Tickets> {
    return this.http.post<Tickets>(this.globalservice.getUrlBackEnd() + 'guardarTicketOrder', ticket, httpOptions)
    .pipe(map(data => data as Tickets ));
  }

  public getDetalleTicket(ticket: Tickets): Observable<Tickets[]> {
    return this.http.post<Tickets>(this.globalservice.getUrlBackEnd() + 'getDetalleTicket', ticket, httpOptions)
    .pipe(map(data => data as unknown as Tickets[] ));
  }


  public getTicketsAsociados(ticket: Tickets): Observable<Tickets[]> {
    return this.http.post<Tickets>(this.globalservice.getUrlBackEnd() + 'getTicketsAsociados', ticket, httpOptions)
    .pipe(map(data => data as unknown as Tickets[] ));
  }

}
