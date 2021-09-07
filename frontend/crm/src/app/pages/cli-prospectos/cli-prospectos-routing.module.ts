import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CliProspectosComponent } from './cli-prospectos/cli-prospectos.component';

const routes: Routes = [
  {
    path: '', component: CliProspectosComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CliProspectosRoutingModule { }
