import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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
export class UsuarioService {

  public loggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public usuariologueado : BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(new Usuario());

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  get isusuarioLogueado(){
    return this.usuariologueado.asObservable();
  }

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

   // metodo para validar credenciales
   public login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.globalservice.getUrlBackEnd() + 'validarCredenciales', usuario, httpOptions)
    .pipe(map(data => data as Usuario ));
  }


  //metodo para obtener objeto de roles del usuario

  public getRoles(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.globalservice.getUrlBackEnd() + 'getRoles', usuario, httpOptions)
    .pipe(map(data => data as Usuario ));
  }




    // metodo para cerrar sesion
    public cerrarSesion() {
      localStorage.clear();
      this.router.navigate(['login']);
    }


}
