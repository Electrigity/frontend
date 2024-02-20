import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import {MenuItem} from "primeng/api";
import {OpenPopupService} from "../services/openPopup.service";
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class PanelMenuComponent {

  username : string = "bitcoinking69"
  open: boolean = false;
  userDisplay : MenuItem = {
    label : this.username,
    icon: 'pi pi-user',
    style: {
      'font-size': '85%'
    }
  }
  openPopup() {
    this.open = !this.open;
    console.log(this.open);
  }
  /*changeUsername : MenuItem = {
    label: "Change Username",
    icon: 'pi pi-pencil',
    items: [this.userDisplay]
  }*/

  items : PanelMenuModule[] = [this.userDisplay]
}
