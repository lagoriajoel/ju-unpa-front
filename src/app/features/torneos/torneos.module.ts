import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TorneosRoutingModule } from './torneos-routing.module';
import { TorneosListComponent } from './torneos-list/torneos-list.component';
import { AddEditTorneosComponent } from './add-edit-torneos/add-edit-torneos.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TorneosListComponent,
    AddEditTorneosComponent
  ],
  imports: [
    CommonModule,
    TorneosRoutingModule,
    SharedModule,
    
  ]
})
export class TorneosModule { }
