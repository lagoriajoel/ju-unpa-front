import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadAcademicaRoutingModule } from './unidad-academica-routing.module';
import { UnidadListComponent } from './unidad-list/unidad-list.component';
import { AddEditUnidadComponent } from './add-edit-unidad/add-edit-unidad.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UnidadListComponent,
    AddEditUnidadComponent,
    
  ],
  imports: [
    CommonModule,
    UnidadAcademicaRoutingModule,
    SharedModule
  ]
})
export class UnidadAcademicaModule { }
