import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from './navbar/navbar.component';
import {MenuModule} from "primeng/menu";
import { PanelMenuComponent } from './dropdown/dropdown.component';
import {PanelMenuModule} from "primeng/panelmenu";
import { TextBoxComponent } from './text-box/text-box.component';
import {DividerModule} from "primeng/divider";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelMenuComponent,
    TextBoxComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MenuModule,
        PanelMenuModule,
        DividerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
