import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplinasRoutingModule } from './disciplinas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DisciplinasListComponent } from './disciplinas-list/disciplinas-list.component';
import { FixtureComponent } from './fixture/fixture.component';

import { AddEditDisciplinaComponent } from './add-edit-disciplina/add-edit-disciplina.component';


@NgModule({
 
  imports: [
    CommonModule,
    DisciplinasRoutingModule,
    SharedModule
  ],
  declarations: [
      DisciplinasListComponent,
      FixtureComponent,
    
      AddEditDisciplinaComponent
  ]
})
export class DisciplinasModule { }
