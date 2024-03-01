import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchPageComponent} from "./search_page/search-page.component";
import {HomePageComponent} from "./home_page/home-page.component";
import {SearchOptionsComponent} from "./search_page/search-options/search-options.component";
import {RegistrationComponent} from "./registration/registration.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: RegistrationComponent },
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
  SearchPageComponent
]
