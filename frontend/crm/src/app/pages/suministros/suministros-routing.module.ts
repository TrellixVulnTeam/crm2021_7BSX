import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuministrosComponent } from './suministros/suministros.component';

const routes: Routes = [
  {
    path: '', component: SuministrosComponent,
    children: [

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuministrosRoutingModule { }
