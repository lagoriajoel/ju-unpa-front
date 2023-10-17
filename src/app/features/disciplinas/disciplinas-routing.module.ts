import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { DisciplinasListComponent } from './disciplinas-list/disciplinas-list.component';
import { FixtureComponent } from './fixture/fixture.component';

import { AddEditDisciplinaComponent } from './add-edit-disciplina/add-edit-disciplina.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DisciplinasListComponent },
      { path: 'fixture', component: FixtureComponent },
     




    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplinasRoutingModule { }
