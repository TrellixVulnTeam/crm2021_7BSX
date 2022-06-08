import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MttoCartas } from '../models/mtto-cartas';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};
@Injectable({
  providedIn: 'root'
})
export class MttoCartasService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

  public getDatosbyCarta(data: MttoCartas): Observable<MttoCartas[]> {
    return this.http.post<MttoCartas>(this.globalservice.getUrlBackEnd() + 'getDatosbyCarta', data, httpOptions)
    .pipe(map(data => data as unknown as MttoCartas[] ));
  }

  public save_parrafo(datos: MttoCartas): Observable<MttoCartas> {
    return this.http.post<MttoCartas>(this.globalservice.getUrlBackEnd() + 'save_parrafo', datos, httpOptions)
    .pipe(map(data => data as MttoCartas ));
  }

  public edit_parrafo(datos: MttoCartas): Observable<MttoCartas> {
    return this.http.post<MttoCartas>(this.globalservice.getUrlBackEnd() + 'edit_parrafo', datos, httpOptions)
    .pipe(map(data => data as MttoCartas ));
  }

  public delete_parrafo(datos: MttoCartas): Observable<MttoCartas> {
    return this.http.post<MttoCartas>(this.globalservice.getUrlBackEnd() + 'delete_parrafo', datos, httpOptions)
    .pipe(map(data => data as MttoCartas ));
  }

  public getClausulaAclaratoria(data: MttoCartas): Observable<MttoCartas> {
    return this.http.post<MttoCartas>(this.globalservice.getUrlBackEnd() + 'getClausulaAclaratoria', data, httpOptions)
    .pipe(map(data => data as unknown as MttoCartas ));
  }


}
