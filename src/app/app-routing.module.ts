import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchPageComponent} from "./search_page/search-page.component";
import {HomePageComponent} from "./home_page/home-page.component";
import {SearchOptionsComponent} from "./search_page/search-options/search-options.component";
import {LoginComponent} from "./registration/login/login.component";
import {SignupComponent} from "./registration/signup/signup.component";
import {BillingComponent} from "./registration/billing/billing.component";
import {TimelineComponent} from "./registration/timeline/timeline.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'billing', component: BillingComponent},
  { path: 'confirmation', component: TimelineComponent},
  { path: 'home', component: HomePageComponent },
  { path: 'search-options', component: SearchOptionsComponent },
  { path: 'search-map', component: SearchOptionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HomePageComponent,
  SearchPageComponent,
  LoginComponent,
  SignupComponent,
  BillingComponent,
  TimelineComponent
]
