import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MotivoAtenciones } from '../models/motivo-atenciones';
import { orden_trabajo } from '../models/orden_trabajo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};

@Injectable({
  providedIn: 'root'
})
export class MotivoAtencionesService {

  datos_motivoatn = new BehaviorSubject<MotivoAtenciones[]>([]);
  _datos_motivoatn = this.datos_motivoatn.asObservable();

  fill_motivoatn(d: MotivoAtenciones[]){
    this.datos_motivoatn.next(d);
  }


  datos_motivoatngc = new BehaviorSubject<MotivoAtenciones[]>([]);
  _datos_motivoatngc = this.datos_motivoatngc.asObservable();

  fill_motivoatngc(d: MotivoAtenciones[]){
    this.datos_motivoatngc.next(d);
  }

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

  public getMotivosAtenciones(): Observable<MotivoAtenciones[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getMotivosAtenciones').pipe(map(data => data as MotivoAtenciones[]));
  }


  public save(datos: MotivoAtenciones): Observable<MotivoAtenciones> {
    return this.http.post<MotivoAtenciones>(this.globalservice.getUrlBackEnd() + 'save_motivoatn', datos, httpOptions)
    .pipe(map(data => data as MotivoAtenciones ));
  }

  public delete(datos: MotivoAtenciones): Observable<MotivoAtenciones> {
    return this.http.post<MotivoAtenciones>(this.globalservice.getUrlBackEnd() + 'delete_motivoatn', datos, httpOptions)
    .pipe(map(data => data as MotivoAtenciones ));
  }

  public edit(datos: MotivoAtenciones): Observable<MotivoAtenciones> {
    return this.http.post<MotivoAtenciones>(this.globalservice.getUrlBackEnd() + 'edit_motivoatn', datos, httpOptions)
    .pipe(map(data => data as MotivoAtenciones ));
  }


  public getMotivosAtenciones_GC(): Observable<MotivoAtenciones[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getMotivosAtenciones_GC').pipe(map(data => data as MotivoAtenciones[]));
  }


  public getSistemaMotivoAtn(data: MotivoAtenciones): Observable<MotivoAtenciones> {
    return this.http.post<MotivoAtenciones>(this.globalservice.getUrlBackEnd() + 'getSistemaMotivoAtn', data, httpOptions)
    .pipe(map(data => data as unknown as MotivoAtenciones ));
  }


  public getOrdenesTrabajo(): Observable<orden_trabajo[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getOrdenesTrabajo').pipe(map(data => data as orden_trabajo[]));
  }





}
