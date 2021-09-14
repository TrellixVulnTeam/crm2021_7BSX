import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atenciones } from '../models/atenciones';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {Observable } from 'rxjs';
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
export class AtencionesService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


  //metodo para obtener objeto de motivos de atenciones para select
  public getMotivosAtenciones(): Observable<Atenciones[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getMotivosAtenciones').pipe(map(data => data as Atenciones[]));
  }


  //metodo para obtener objeto de tipos de atenciones para select
  public getTiposAtenciones(): Observable<Atenciones[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getTiposAtenciones').pipe(map(data => data as Atenciones[]));
  }
}
