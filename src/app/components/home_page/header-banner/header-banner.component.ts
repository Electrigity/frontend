import {Component, Input} from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import {ConfirmationService, MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {NotificationsService} from "../../../services/notifications.service";
import {SidebarService} from "../../../services/sidebar.service";
import {Web3} from "web3";
import {MetaMaskInpageProvider} from "@metamask/providers";
import {ApiService} from "../../../services/api.service";
import {UserInfo} from "../../../models/UserInfo";
import {SettingsComponent} from "../settings/settings.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

// declare global {
//   interface Window {
//     ethereum?: MetaMaskInpageProvider
//   }
// }

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrl: './header-banner.component.scss'
})
export class HeaderBannerComponent {
  userId!: string
  username: string = ''
  userInfo!: UserInfo
  menuItems!: MenuItem[]

  ref: DynamicDialogRef | undefined;
  constructor(
    private router: Router,
    private _notificationsService: NotificationsService,
    public _sidebarService: SidebarService,
    private _confirmationService: ConfirmationService,
    private _dialogService: DialogService,
    private _apiService: ApiService
    ) {
  }

  ngOnInit() {
    this.userId = localStorage.getItem("currentUser")!

    if (this.userId == null) {
      this.router.navigate(['/login'])
    } else {
      this.getUserInfo()
    }
  }

  openPopup() {
    if(this._notificationsService.getToggleStatus()) {
      this._notificationsService.toggleFirstClick()
    }
    this._notificationsService.toggleNotifications();
  }

  async getUserInfo() {
    this.userInfo = await this._apiService.getUserInfo(this.userId)
    const userDisplay : MenuItem = {
      label : this.userInfo.username,
      icon: 'pi pi-user',
      style: {
        'font-size': '85%',
      }
    }
    this.menuItems = [userDisplay]
    this.username = this.userInfo.username
  }

  settingsPopup() {
    this.ref = this._dialogService.open(SettingsComponent, {  width: '50vw'});
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
        },
        key: 'log-out'
      })
    }


  }

  protected readonly localStorage = localStorage;
  protected readonly open = open;
  protected readonly alert = alert;
}
