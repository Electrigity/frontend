import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {NotificationsService} from "../services/notifications.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {PopupComponent} from "../popup/popup.component";
import {SettingsComponent} from "../settings/settings.component";
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class PanelMenuComponent {
  ref: DynamicDialogRef | undefined;
  constructor(private router: Router, private _notificationsService: NotificationsService, public dialogService: DialogService) {
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

  notificationsPopup() {
    if(this._notificationsService.getToggleStatus()) {
      this._notificationsService.toggleFirstClick();
    }
    this._notificationsService.toggleNotifications();
  }

  settingsPopup() {
    this.ref = this.dialogService.open(SettingsComponent, {  width: '50vw'});
  }

  logoutUser() {
    localStorage.removeItem("currentUser")
    this.router.navigate(['/login'])
  }

  protected readonly localStorage = localStorage;
}
