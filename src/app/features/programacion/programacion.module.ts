import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramacionRoutingModule } from './programacion-routing.module';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { AddProgramComponent } from './add-program/add-program.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditResultComponent } from './edit-result/edit-result.component';


@NgModule({
  declarations: [
    ProgramDetailComponent,
    AddProgramComponent,
    EditResultComponent
  ],
  imports: [
    CommonModule,
    ProgramacionRoutingModule,
    SharedModule
  ]
})
export class ProgramacionModule { }
