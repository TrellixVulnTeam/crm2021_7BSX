import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { GlobalService } from 'src/app/services/global.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ManualMdComponent } from './manual-md/manual-md.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Usuario = new Usuario();
  dashboard = 'Inicio';

  constructor(private router: Router, private usuarioservice : UsuarioService, private global: GlobalService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');



      this.global._opcionMenu.subscribe(response=>{
        this.dashboard = response;
      });

  }else{
    this.router.navigate(['login']);
  }
  }

  public cerrarSesion() {

    this.usuarioservice.loggedIn.next(false);
     localStorage.clear();
     this.router.navigate(['login']);
   }


   verManual(){
    this.dialog.open(ManualMdComponent,{
      width: '80%',
    });
   }




}
