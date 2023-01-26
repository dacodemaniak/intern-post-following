import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StagiairesModule } from './stagiaires/stagiaires.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { authInterceptor } from './core/services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StagiairesModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    authInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
