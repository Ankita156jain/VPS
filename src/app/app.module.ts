import { VPSComonent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'

@NgModule({
  exports: [BrowserModule],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpModule],
  bootstrap: [VPSComonent],
  declarations: [VPSComonent]
})
export class AppModule { }
