import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StagiairesRoutingModule } from './stagiaires-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { InitialsPipe } from './pipes/initials.pipe';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    InitialsPipe
  ],
  imports: [
    CommonModule,
    StagiairesRoutingModule
  ]
})
export class StagiairesModule { }
