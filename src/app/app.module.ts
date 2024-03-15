import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from './navbar/navbar.component';
import {MenuModule} from "primeng/menu";
import { HeaderBannerComponent } from './home_page/header-banner/header-banner.component';
import {PanelMenuModule} from "primeng/panelmenu";
import { TextBoxComponent } from './home_page/text-box/text-box.component';
import {DividerModule} from "primeng/divider";
import { TableFilterComponent } from './home_page/table-filter/table-filter.component';
import {ChipModule} from "primeng/chip";
import { TableHistoryComponent } from './home_page/table-history/table-history.component';
import {TableModule} from "primeng/table";
import {HttpClientModule} from "@angular/common/http";
import { MapSearchComponent } from './search_page/map-search.component';
import {TimelineModule} from "primeng/timeline";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {CalendarModule} from "primeng/calendar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardInfoComponent} from "./registration/card-info/card-info.component";
import {NotificationComponent} from "./home_page/notification/notification.component";
import {MessagesModule} from "primeng/messages";
import { UserSidebarComponent } from './home_page/user-sidebar/user-sidebar.component';
import {SidebarModule} from "primeng/sidebar";
import {RadioButtonModule} from "primeng/radiobutton";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TagModule} from "primeng/tag";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {SliderModule} from "primeng/slider";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderBannerComponent,
    TextBoxComponent,
    TableFilterComponent,
    TableHistoryComponent,
    MapSearchComponent,
    CardInfoComponent,
    NotificationComponent,
    routingComponents,
    UserSidebarComponent
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
    SidebarModule,
    RadioButtonModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    TagModule,
    DialogModule,
    DropdownModule,
    SliderModule,
    InputTextModule
  ],
  providers: [
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
