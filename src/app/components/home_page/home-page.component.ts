import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {SidebarService} from "../../services/sidebar.service";
import {NotificationComponent} from "./notification/notification.component";
import {ApiService} from "../../services/api.service";
import {UserInfo} from "../../models/UserInfo";
import {PopupComponent} from "./popup/popup.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {StyleClass, StyleClassModule} from "primeng/styleclass";
import {UserTradingInfo} from "../../models/UserTradingInfo";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  toggledNotifications: boolean = false;
  ref: DynamicDialogRef | undefined;
  @ViewChild('notificationsRef') notificationsRef!: NotificationComponent

  userAddress!: string
  userInfo!: UserInfo
  username!: string

  userTradingInfo!: UserTradingInfo
  tradingStatus!: string
  buySellAmount!: bigint
  price!: bigint
  expiryDate!: bigint
  date!: Date

  constructor(
    private router: Router,
    public _sidebarService: SidebarService,
    private _apiService: ApiService,
    private _dialogService: DialogService,
  ) { }


  async ngOnInit() {
    this.userAddress = localStorage.getItem("currentUser")!
    this.userInfo  = await this._apiService.getUserInfo(this.userAddress)
    this.userTradingInfo = await this._apiService.getTradingInfo(this.userAddress)

    this.username = this.userInfo.username

    this.tradingStatus = this.userTradingInfo.tradingStatus
    this.buySellAmount = this.userTradingInfo.buySellAmount
    this.price = this.userTradingInfo.price
    this.expiryDate = this.userTradingInfo.expiryDate
    this.date = new Date(Number(this.expiryDate))

    console.log(await this._apiService.getRegisteredUsernames())

    if(this.userAddress == null || !(await this._apiService.isUserRegistered(this.userAddress))) {
      this.router.navigate(['/login'])
    }
  }

  show() {
    this.ref = this._dialogService.open(PopupComponent, {  width: '50vw'});
  }

  protected readonly localStorage = localStorage;
  protected readonly BigInt = BigInt;
}
