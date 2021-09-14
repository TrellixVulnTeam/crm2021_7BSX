import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Usuario = new Usuario();
  dashboard = 'Inicio';

  constructor(private router: Router, private usuarioservice : UsuarioService) { }

  ngOnInit(): void {
    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');

  }else{
    this.router.navigate(['login']);
  }
  }

  public cerrarSesion() {

    this.usuarioservice.loggedIn.next(false);
     localStorage.clear();
     this.router.navigate(['login']);
   }

   changeMenu(opcion: string){
    this.dashboard = opcion;
   }
}
