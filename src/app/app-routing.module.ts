import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home_page/home-page.component";
import {MapSearchComponent} from "./search_page/map-search.component";
import {LoginComponent} from "./registration/login/login.component";
import {SignupComponent} from "./registration/signup/signup.component";
import {BillingComponent} from "./registration/billing/billing.component";
import {TimelineComponent} from "./registration/timeline/timeline.component";
import {QuestionsPageComponent} from "./questions-page/questions-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'billing', component: BillingComponent},
  { path: 'confirmation', component: TimelineComponent},
  { path: 'home', component: HomePageComponent },
  { path: 'search-map', component: MapSearchComponent },
  { path: 'faq', component: QuestionsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HomePageComponent,
  MapSearchComponent,
  LoginComponent,
  SignupComponent,
  BillingComponent,
  TimelineComponent,
  QuestionsPageComponent
]
