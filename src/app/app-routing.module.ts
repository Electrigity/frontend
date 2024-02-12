import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegistrationComponent} from "./registration/registration.component";
import {BillingComponent} from "./billing/billing.component";
import {TimelineComponent} from "./timeline/timeline.component";

const routes : Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'billing', component: BillingComponent},
  {path: 'confirmation', component: TimelineComponent},
  {path: '', redirectTo: 'registration', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
