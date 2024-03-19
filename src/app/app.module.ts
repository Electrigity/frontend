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
import { MapSearchComponent } from './search_page/map-search.component';
import { RegistrationComponent } from './registration/registration.component';
import {TimelineModule} from "primeng/timeline";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {CardInfoComponent} from "./registration/card-info/card-info.component";
import {NotificationComponent} from "./home_page/notification/notification.component";
import {MessagesModule} from "primeng/messages";
import { PopupComponent } from './home_page/popup/popup.component';
import {CardModule} from "primeng/card";
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {TabViewModule} from "primeng/tabview";
import { SettingsComponent } from './home_page/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelMenuComponent,
    TextBoxComponent,
    TableFilterComponent,
    TableHistoryComponent,
    MapSearchComponent,
    CardInfoComponent,
    NotificationComponent,
    routingComponents,
    PopupComponent,
    SettingsComponent,
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
    FormsModule,
    MessagesModule,
    CardModule,
    TabViewModule
  ],
  providers: [DialogService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
