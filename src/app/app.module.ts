import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from './navbar/navbar.component';
import {MenuModule} from "primeng/menu";
import { PanelMenuComponent } from './dropdown/dropdown.component';
import {PanelMenuModule} from "primeng/panelmenu";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelMenuComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MenuModule,
        PanelMenuModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
