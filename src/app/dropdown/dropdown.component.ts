import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import {MenuItem} from "primeng/api";
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class PanelMenuComponent {
  username : string = "bitcoinking69"
  userDisplay : MenuItem = {
    label : this.username,
    icon: 'pi pi-user'
  }
  /*changeUsername : MenuItem = {
    label: "Change Username",
    icon: 'pi pi-pencil',
    items: [this.userDisplay]
  }*/

  items : PanelMenuModule[] = [this.userDisplay]
}
