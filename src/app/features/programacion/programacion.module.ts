import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramacionRoutingModule } from './programacion-routing.module';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { AddProgramComponent } from './add-program/add-program.component';


@NgModule({
  declarations: [
    ProgramDetailComponent,
    AddProgramComponent
  ],
  imports: [
    CommonModule,
    ProgramacionRoutingModule
  ]
})
export class ProgramacionModule { }
