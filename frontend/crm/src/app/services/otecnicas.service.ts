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




}
