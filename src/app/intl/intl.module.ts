import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { intlProvider } from './services/intl.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    intlProvider
  ]
})
export class IntlModule { }
