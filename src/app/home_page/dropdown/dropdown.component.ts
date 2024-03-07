import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {NotificationsService} from "../services/notifications.service";
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class PanelMenuComponent {

  constructor(private router: Router, private _notificationsService: NotificationsService) {
  }

  username : string = "bitcoinking69"
  userDisplay : MenuItem = {
    label : this.username,
    icon: 'pi pi-user',
    style: {
      'font-size': '85%',
    }
  }

  items : PanelMenuModule[] = [this.userDisplay]

  openPopup() {
    if(this._notificationsService.getToggleStatus()) {
      this._notificationsService.toggleFirstClick();
    }
    this._notificationsService.toggleNotifications();
  }

  logoutUser() {
    localStorage.removeItem("currentUser")
    this.router.navigate(['/login'])
  }

  protected readonly localStorage = localStorage;
}
