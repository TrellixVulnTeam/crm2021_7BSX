import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { EventosComponent } from './eventos/eventos.component';
import { MatModuleModule } from 'src/app/mat-module.module';
import { ModalEventoComponent } from './modal-evento/modal-evento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventosComponent,
    ModalEventoComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    MatModuleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ModalEventoComponent
  ]
})
export class EventosModule { }
