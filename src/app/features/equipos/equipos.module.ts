import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposListComponent } from './equipos-list/equipos-list.component';
import { AddEditEquipoComponent } from './add-edit-equipo/add-edit-equipo.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EquiposListComponent,
    AddEditEquipoComponent
  ],
  imports: [
    CommonModule,
    EquiposRoutingModule,
    SharedModule
  ]
})
export class EquiposModule { }
