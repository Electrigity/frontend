import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NotificationsService} from "../../services/notifications.service";
import {SidebarService} from "../../services/sidebar.service";
import {NotificationComponent} from "./notification/notification.component";
import {ApiService} from "../../services/api.service";
import {UserInfo} from "../../models/UserInfo";
import {PopupComponent} from "./popup/popup.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  title = 'Electrigity';

  toggledNotifications: boolean = false;
  ref: DynamicDialogRef | undefined;
  @ViewChild('notificationsRef') notificationsRef!: NotificationComponent

  constructor(
    private router: Router,
    private _notificationsService: NotificationsService,
    public _sidebarService: SidebarService,
    private _apiService: ApiService,
    private _dialogService: DialogService,
  ) {
    _notificationsService.showNotifications$.subscribe(
      toggled => {
        this.toggledNotifications = toggled;
      }
    )
    // document.addEventListener('click', (event: Event) => {
    //   const target = event.target as HTMLElement;
    //   if (this.notificationsRef != undefined) {
    //     if(this._notificationsService.isFirstClick()) {
    //       this._notificationsService.toggleFirstClick()
    //     }
    //     else {
    //       if (!this.notificationsRef.element.nativeElement.contains(target)) {
    //         _notificationsService.toggleNotifications();
    //         _notificationsService.toggleFirstClick();
    //       }
    //     }
    //   }
    // });


  }

  totalEnergyBoughtBox = {
    'title': 'Total Energy Bought',
    'powerValue': 450,
    'price': 345.69,
    'date': 'as of 01-December 2022'
  }
  pendingPaymentsBox = {
    'title': 'Pending Payments',
    'powerValue': 37,
    'price': 69.42,
    'date': 'as of 01-December 2022'
  }
  accountBalanceBox = {
    'title': 'Account Balance',
    'balance': 690.42,
    'date': '',
    'isAccountBalance': true
  }

  async ngOnInit() {
    const currentUser = localStorage.getItem("currentUser")!

    if(currentUser == null || !(await this._apiService.isUserRegistered(currentUser))) {
      this.router.navigate(['/login'])
    }
  }

  show() {
    this.ref = this._dialogService.open(PopupComponent, {  width: '50vw'});
  }



  protected readonly localStorage = localStorage;
}
