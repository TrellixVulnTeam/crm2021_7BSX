import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePipe } from './cliente.pipe';
import { UsuarioPipe } from './usuario.pipe';



@NgModule({
  declarations: [
    ClientePipe,
    UsuarioPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ClientePipe,
    UsuarioPipe
  ]
})
export class PipesModule { }
