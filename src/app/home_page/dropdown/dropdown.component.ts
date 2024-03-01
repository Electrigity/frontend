import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class PanelMenuComponent {

  constructor(private router: Router) {
  }

  username : string = "bitcoinking69"
  userDisplay : MenuItem = {
    label : this.username,
    icon: 'pi pi-user',
    style: {
      'font-size': '85%',
    }
  }
  /*changeUsername : MenuItem = {
    label: "Change Username",
    icon: 'pi pi-pencil',
    items: [this.userDisplay]
  }*/

  items : PanelMenuModule[] = [this.userDisplay]

  logoutUser() {
    localStorage.removeItem("currentUser")
    this.router.navigate(['/login'])
  }
}
