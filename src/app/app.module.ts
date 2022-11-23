import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialsPipe } from './shared/pipes/initials.pipe';
import { ListComponent } from './pages/stagiaires/list/list.component';
import { DetailComponent } from './pages/stagiaires/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialsPipe,
    ListComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
