import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtecnicasComponent } from './otecnicas/otecnicas.component';

const routes: Routes = [
  {
    path: '', component: OtecnicasComponent,
    children: [

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtecnicasRoutingModule { }
