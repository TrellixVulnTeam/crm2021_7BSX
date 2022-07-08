import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Roles } from 'src/app/models/roles';
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
  roles!: Roles[];

  rol_caja_cliente: boolean | undefined;

  constructor(private router: Router, private usuarioservice : UsuarioService, private global: GlobalService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.rol_caja_cliente = false;
    if(localStorage.getItem('usuario_crm') !== null){

      this.user = JSON.parse(localStorage.getItem("usuario_crm") || '{}');

      this.roles = JSON.parse(localStorage.getItem("roles_crm") || '{}');



      this.global._opcionMenu.subscribe(response=>{
        this.dashboard = response;
      });


      this.roles.forEach((element: any) => {
        if(element["rol"]==='Caja de clientes'){
          this.rol_caja_cliente = true;
        }else{
          this.rol_caja_cliente = false;
        }
      });

  }else{
    this.router.navigate(['login']);
  }




  //console.log(this.rol_caja_cliente);


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
