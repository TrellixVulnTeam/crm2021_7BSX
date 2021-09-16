import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Archivos } from '../models/archivos';
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
export class ArchivosService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

  public mover_archivo(archivo: any): Observable<Archivos> {
    return this.http.post<Archivos>(this.globalservice.getUrlBackEnd() + 'mover_archivo', archivo, httpOptions)
    .pipe(map(data => data as Archivos ));
  }

  public eliminar_archivo(archivo: Archivos): Observable<Archivos> {
    return this.http.post<Archivos>(this.globalservice.getUrlBackEnd() + 'eliminar_archivo', archivo, httpOptions)
    .pipe(map(data => data as Archivos ));
  }
}
