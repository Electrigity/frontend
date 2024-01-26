import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from './navbar/navbar.component';
import {MenuModule} from "primeng/menu";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MenuModule,
        DropdownModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
