import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm : FormGroup;
  user: Usuario = new Usuario();

  constructor(private usuarioservice: UsuarioService, private router: Router,
    private _snackBar: MatSnackBar) {
    this.validateForm = new FormGroup({
    'alias' : new FormControl(''),
    'password' : new FormControl(''),

  });}

  ngOnInit(): void {
    localStorage.clear();
  }


  validarCredenciales() {
    let datosUsuario : Usuario = new Usuario();

    datosUsuario = this.validateForm.value;

    this.usuarioservice.login(datosUsuario).subscribe(
      response => {
        this.user = response;
        localStorage.setItem('usuario_crm', JSON.stringify(this.user));

      },
      err => {

      },
      () => {
        let obj = this.user;


        if( Object.keys(obj).length === 0){
          this._snackBar.open('Error al validar credenciales', 'Ok', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });

        }else{


          this.usuarioservice.getRoles(datosUsuario).subscribe(
            response => {
              this.user = response;
              localStorage.setItem('roles_crm', JSON.stringify(this.user));

            },
            err => {

            },
            () => {
              this._snackBar.open('¡¡ Bienvenido !!', 'Ok', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              });
                this.router.navigate(['dashboard']);
            },
          );



        }

      },
    );
  }

}
