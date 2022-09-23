import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Otecnicas } from '../models/otecnicas';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable } from 'rxjs';
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
export class OtecnicasService {

  datos_ordenesTodas = new BehaviorSubject<Otecnicas[]>([]);
  _datos_ordenesTodas = this.datos_ordenesTodas.asObservable();

  fillordenesTodas_list(d: Otecnicas[]){
    this.datos_ordenesTodas.next(d);
  }


  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


  public getAllOrdenes(): Observable<Otecnicas[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getAllOrdenes').pipe(map(data => data as Otecnicas[]));
  }


  public aprobarOrdenTecnica(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'aprobarOrdenTecnica', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }

  public aprobarOrdenVentas(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'aprobarOrdenVentas', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }


  public denegarOrdenTecnica(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'denegarOrdenTecnica', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }


  public denegarOrdenVentas(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'denegarOrdenVentas', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }


  public aprobarOrdenGG(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'aprobarOrdenGG', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }


  public denegarOrdenGG(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'denegarOrdenGG', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }



  public aprobarOrdenFinanzas(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'aprobarOrdenFinanzas', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }


  public denegarOrdenFinanzas(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'denegarOrdenFinanzas', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }
  public comentariolegal(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'comentariolegal', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }


  public aprobarOrdenOc(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'aprobarOrdenOc', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }


  public denegarOrdenOc(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'denegarOrdenOc', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }


  public save_info_real(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'save_info_real', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }


  public save_info_monto_real(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'save_info_monto_real', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }


  public getDatosAnualesOrden(ot: Otecnicas): Observable<Otecnicas[]> {
    return this.http.post<Otecnicas[]>(this.globalservice.getUrlBackEnd() + 'getDatosAnualesOrden', ot, httpOptions)
    .pipe(map(data => data as Otecnicas[] ));
  }

  public guardar_detalle_anual(ot: Otecnicas): Observable<Otecnicas> {
    return this.http.post<Otecnicas>(this.globalservice.getUrlBackEnd() + 'guardar_detalle_anual', ot, httpOptions)
    .pipe(map(data => data as Otecnicas ));
  }



}
