import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template/template.component';
import { MatModuleModule } from 'src/app/mat-module.module';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    MatModuleModule,
    ChartModule
  ]
})
export class TemplateModule { }
