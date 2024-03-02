import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from './navbar/navbar.component';
import {MenuModule} from "primeng/menu";
import { PanelMenuComponent } from './home_page/dropdown/dropdown.component';
import {PanelMenuModule} from "primeng/panelmenu";
import { TextBoxComponent } from './home_page/text-box/text-box.component';
import {DividerModule} from "primeng/divider";
import { TableFilterComponent } from './home_page/table-filter/table-filter.component';
import {ChipModule} from "primeng/chip";
import { TableHistoryComponent } from './home_page/table-history/table-history.component';
import {TableModule} from "primeng/table";
import {HttpClientModule} from "@angular/common/http";
import { SearchOptionsComponent } from './search_page/search-options/search-options.component';
import { RegistrationComponent } from './registration/registration.component';
import {TimelineModule} from "primeng/timeline";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {CardInfoComponent} from "./registration/card-info/card-info.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelMenuComponent,
    TextBoxComponent,
    TableFilterComponent,
    TableHistoryComponent,
    SearchOptionsComponent,
    CardInfoComponent,
    routingComponents
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenuModule,
    PanelMenuModule,
    DividerModule,
    ChipModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    CheckboxModule,
    InputGroupModule,
    InputGroupAddonModule,
    CalendarModule,
    TimelineModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
