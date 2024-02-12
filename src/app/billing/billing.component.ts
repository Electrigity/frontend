import { Component } from '@angular/core';
import {SharedModule} from "primeng/api";
import {TimelineModule} from "primeng/timeline";
import {CardInfoComponent} from "../card-info/card-info.component";
import {ButtonModule} from "primeng/button";
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent {
  constructor(private router: Router) {
  }
  events : any[]  = [
    {title: 'Registration', icon: 'pi pi-circle-fill'},
    {title: 'Billed', icon: 'pi pi-circle-fill'},
    {title: 'Confirmation', icon: 'pi pi-circle'}
  ]

  OnClickBack() {
    this.router.navigate(['/registration']);
  }

  OnClickNext() {
    this.router.navigate(['/confirmation']);
  }
}
