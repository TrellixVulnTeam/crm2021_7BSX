import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtencionesComponent } from './atenciones/atenciones.component';

const routes: Routes = [
  {
    path: '', component: AtencionesComponent,
    children: [

    ],

  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtencionesRoutingModule { }
