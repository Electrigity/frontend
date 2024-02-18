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
import { BuilderIoComponent } from './builder-io/builder-io.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import {ChipModule} from "primeng/chip";
import { TableHistoryComponent } from './table-history/table-history.component';
import {TableModule} from "primeng/table";
import {HttpClientModule} from "@angular/common/http";
import { SearchOptionsComponent } from './search-options/search-options.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelMenuComponent,
    TextBoxComponent,
    BuilderIoComponent,
    TableFilterComponent,
    TableHistoryComponent,
    SearchOptionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenuModule,
    PanelMenuModule,
    DividerModule,
    ChipModule,
    TableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
