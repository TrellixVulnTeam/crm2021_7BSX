import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { EventosComponent } from './eventos/eventos.component';
import { MatModuleModule } from 'src/app/mat-module.module';


@NgModule({
  declarations: [
    EventosComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    MatModuleModule
  ]
})
export class EventosModule { }
