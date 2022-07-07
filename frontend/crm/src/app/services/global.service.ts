import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  opcionMenu = new BehaviorSubject<string>('');
  _opcionMenu = this.opcionMenu.asObservable();

   // llenar el observable de behaviour subject
   fillOpcionMenu(d: string){
    this.opcionMenu.next(d);
  }



  constructor(private http: HttpClient) { }

  public getUrlBackEnd() {
    return 'http://192.168.50.65:8092/';
  }
}

