import { Component } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import {ConfirmationService, MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {NotificationsService} from "../services/notifications.service";
import {SidebarService} from "../services/sidebar.service";
@Component({
  selector: 'app-dropdown',
  templateUrl: './header-banner.component.html',
  styleUrl: './header-banner.component.scss'
})
export class HeaderBannerComponent {

  sidebarVisible: boolean = false;

  constructor(
    private router: Router,
    private _notificationsService: NotificationsService,
    public _sidebarService: SidebarService,
    private _confirmationService: ConfirmationService
    ) {
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

  confirmLogout(event: Event) {
    const target = event.target as HTMLElement
    const ariaLabel = target.getAttribute('aria-label')
    if (ariaLabel == 'logout-icon') {
      this._confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to logout?',
        header: 'Log out',
        icon: 'pi pi-exclamation-circle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        acceptButtonStyleClass: 'p-button-danger',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          this.logoutUser()
        }
      })
    }


  }

  protected readonly localStorage = localStorage;
}
