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
import { TimelineComponent } from '../../projects/appone/src/app/timeline/timeline.component';
import {TimelineModule} from "primeng/timeline";
import {ButtonModule} from "primeng/button";
import {RegistrationComponent} from "../../projects/registration/src/app/registration/registration.component";
import { FormsModule } from '@angular/forms';
import {BillingComponent} from "../../projects/billing/src/app/billing/billing.component";
import {CardInfoComponent} from "../../projects/billing/src/app/card-info/card-info.component";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelMenuComponent,
    TextBoxComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenuModule,
    PanelMenuModule,
    DividerModule,
    TimelineModule,
    ButtonModule,
    RegistrationComponent,
    FormsModule,
    BillingComponent,
    CardInfoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
