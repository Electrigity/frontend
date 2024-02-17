import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TimelineComponent} from "./timeline/timeline.component";
import {RegistrationComponent} from "./registration/registration.component";
import {CardInfoComponent} from "./card-info/card-info.component";
import {BillingComponent} from "./billing/billing.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TimelineModule} from "primeng/timeline";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { ValentineComponent } from './valentine/valentine.component';
import { SearchService } from './search.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    RegistrationComponent,
    CardInfoComponent,
    BillingComponent,
    LoginComponent,
    ValentineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TimelineModule,
    ButtonModule,
    CheckboxModule,
    InputGroupModule,
    InputGroupAddonModule,
    CalendarModule,
    FormsModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
