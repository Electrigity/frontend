import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from './components/navbar/navbar.component';
import {MenuModule} from "primeng/menu";
import {PanelMenuModule} from "primeng/panelmenu";
import {DividerModule} from "primeng/divider";
import {ChipModule} from "primeng/chip";
import {TableModule} from "primeng/table";
import {HttpClientModule} from "@angular/common/http";
import { MapSearchComponent } from './components/search_page/map-search.component';
import {TimelineModule} from "primeng/timeline";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {CalendarModule} from "primeng/calendar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessagesModule} from "primeng/messages";
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
import {HeaderBannerComponent} from "./components/home_page/header-banner/header-banner.component";
import {TextBoxComponent} from "./components/home_page/text-box/text-box.component";
import {TableFilterComponent} from "./components/home_page/table-filter/table-filter.component";
import {TableHistoryComponent} from "./components/home_page/table-history/table-history.component";
import {CardInfoComponent} from "./components/registration/card-info/card-info.component";
import {NotificationComponent} from "./components/home_page/notification/notification.component";
import {UserSidebarComponent} from "./components/home_page/user-sidebar/user-sidebar.component";
import {SkeletonModule} from "primeng/skeleton";
import {DialogService} from "primeng/dynamicdialog";
import {SettingsComponent} from "./components/home_page/settings/settings.component";
import {ToastModule} from "primeng/toast";
import {CardModule} from "primeng/card";
import {TabViewModule} from "primeng/tabview";
import {PopupComponent} from "./components/home_page/popup/popup.component";
import {FieldsetModule} from "primeng/fieldset";

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
    SettingsComponent,
    PopupComponent,
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
    InputTextModule,
    SkeletonModule,
    ToastModule,
    CardModule,
    TabViewModule,
    FieldsetModule
  ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
