import {Component, Input, SimpleChanges} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {SidebarService} from "../../../services/sidebar.service";
import {ApiService} from "../../../services/api.service";
import {SettingsComponent} from "../settings/settings.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {UserInfo} from "../../../models/UserInfo";
import {PendingTransaction} from "../../../models/PendingTransaction";
import {QueueUsers} from "../../../models/QueueUsers";


@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  styleUrl: './header-banner.component.scss'
})
export class HeaderBannerComponent {
  @Input() userId!: string
  @Input() username!: string
  @Input() userInfo!: UserInfo
  @Input() notificationsCount: number = 0
  @Input() numberOfUsersInQueue!: QueueUsers

  timeRemaining! : number;
  menuItems!: MenuItem[]
  interval! : any

  pendingTransactions!: PendingTransaction[]

  ref: DynamicDialogRef | undefined;

  constructor(
    private router: Router,
    public _sidebarService: SidebarService,
    private _confirmationService: ConfirmationService,
    private _dialogService: DialogService,
    private _apiService: ApiService
  ) {
  }

  async ngOnInit() {
    this.startTimer()
    this.pendingTransactions = await this._apiService.getUserPendingTransactions()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateUserInfo()
  }

  startTimer(): void {
    this.timeRemaining = 15 * 60; // 15 minutes in seconds

    this.interval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        clearInterval(this.interval);
        // Perform functionality when the timer stops
        this.timerFinished();
        // Restart the timer
        this.startTimer();
      }
    }, 1000); // Update every second
  }


  timerFinished(): void {
    console.log('Timer has finished! Perform some functionality here.');
  }
  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
