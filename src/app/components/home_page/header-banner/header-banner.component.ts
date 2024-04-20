import {Component, Input, SimpleChanges} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {SidebarService} from "../../../services/sidebar.service";
import {ApiService} from "../../../services/api.service";
import {SettingsComponent} from "../settings/settings.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {UserInfo} from "../../../models/UserInfo";


@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrl: './header-banner.component.scss'
})
export class HeaderBannerComponent {
  @Input() userId!: string
  @Input() username!: string
  @Input() userInfo!: UserInfo

  menuItems!: MenuItem[]

  ref: DynamicDialogRef | undefined;

  constructor(
    private router: Router,
    public _sidebarService: SidebarService,
    private _confirmationService: ConfirmationService,
    private _dialogService: DialogService,
    private _apiService: ApiService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateUserInfo()
  }

  updateUserInfo() {
    const userDisplay: MenuItem = {
      label: this.username,
      icon: 'pi pi-user',
      style: {
        'font-size': '85%',
      }
    }
    this.menuItems = [userDisplay]
  }

  settingsPopup() {
    this.ref = this._dialogService.open(SettingsComponent, {
      width: '50vw',
      data: {
        username: this.username,
        userInfo: this.userInfo
      }
    });
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
