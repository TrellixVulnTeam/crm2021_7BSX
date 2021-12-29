import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatModuleModule } from 'src/app/mat-module.module';
import { ManualMdComponent } from './dashboard/manual-md/manual-md.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ManualMdComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatModuleModule
  ]
})
export class DashboardModule { }
