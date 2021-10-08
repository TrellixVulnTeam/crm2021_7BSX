import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Suministros } from '../models/suministros';
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
export class SuministrosService {

  datos_Suministros = new BehaviorSubject<Suministros[]>([]);
  _datos_Suministros = this.datos_Suministros.asObservable();

  fillSuministros_list(d: Suministros[]){
    this.datos_Suministros.next(d);
  }


  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

  public getAllSuministros(): Observable<Suministros[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getAllSuministros').pipe(map(data => data as Suministros[]));
  }


  public getAtencionesBySuministro(nis: Suministros): Observable<Suministros[]> {
    return this.http.post<Suministros>(this.globalservice.getUrlBackEnd() + 'getAtencionesBySuministro', nis, httpOptions)
    .pipe(map(data => data as unknown as Suministros[] ));
  }


}
