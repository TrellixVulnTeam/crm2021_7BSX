import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MttoCartasComponent } from './mtto-cartas/mtto-cartas.component';

const routes: Routes = [
  {
    path: '', component: MttoCartasComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MttoCartasRoutingModule { }
