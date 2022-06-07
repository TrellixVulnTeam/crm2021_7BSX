import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotivoAtencionesComponent } from './motivo-atenciones/motivo-atenciones.component';

const routes: Routes = [
  {
    path: '', component: MotivoAtencionesComponent,
    children: [

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotivoAtencionesRoutingModule { }
