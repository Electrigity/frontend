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
import {CommittedTransaction} from "../../models/CommittedTransaction";
import {MenuItem} from "primeng/api";
import {QueueUsers} from "../../models/QueueUsers";
import {AverageQueuePrice} from "../../models/AverageQueuePrice";
import {IndirectTrade} from "../../models/IndirectTrade";
import {IndirectTradeInfo} from "../../models/IndirectTradeInfo";

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
  notificationsCount: number = 0

  userTradingInfo!: UserTradingInfo
  indirectTradingInfo!: IndirectTradeInfo
  tradingStatus!: string
  buySellAmount!: bigint
  price!: bigint
  expiryDate!: bigint
  date!: Date

  numberOfUsersInQueue!: QueueUsers
  averageQueuePrice!: AverageQueuePrice

  directTableInfo: CommittedTransaction[] = []
  indirectTableInfo: IndirectTrade[] = []

  constructor(
    private router: Router,
    public _sidebarService: SidebarService,
    private _apiService: ApiService,
    private _dialogService: DialogService,
  ) {
  }


  async ngOnInit() {
    this.userAddress = localStorage.getItem("currentUser")!
    this.userInfo = await this._apiService.getUserInfo(this.userAddress)
    this.userTradingInfo = await this._apiService.getTradingInfo(this.userAddress)
    this.notificationsCount = await this._apiService.getNotCommittedTransactionsCount()
    this.numberOfUsersInQueue = await this._apiService.numberOfBuyersAndSellersInQueue()
    this.averageQueuePrice = await this._apiService.averagePriceInQueue()
    this.indirectTradingInfo = await this._apiService.getIndirectTradingSettings()

    // console.log(await this._apiService.matchOrders())
    // console.log(await this._apiService.getIndirectTradeHistory())
    // console.log(await this._apiService.averagePriceInQueue())

    this.username = this.userInfo.username

    this.tradingStatus = this.userTradingInfo.tradingStatus
    this.buySellAmount = this.userTradingInfo.buySellAmount
    this.price = this.userTradingInfo.price
    this.expiryDate = this.userTradingInfo.expiryDate
    this.date = new Date(Number(this.expiryDate))

    this.directTableInfo = await this._apiService.getCommittedTransactions()
    this.indirectTableInfo = await this._apiService.getIndirectTradeHistory()

    if (this.userAddress == null || !(await this._apiService.isUserRegistered(this.userAddress))) {
      this.router.navigate(['/login'])
    }

  }

  show() {
    this.ref = this._dialogService.open(PopupComponent, {
      width: '50vw', data: {
        'numberOfBuyers' : this.numberOfUsersInQueue.numberOfBuyers,
        'numberOfSellers' : this.numberOfUsersInQueue.numberOfSellers,
        'averageBuyPrice' : this.averageQueuePrice.averageBuyPrice,
        'averageSellPrice' : this.averageQueuePrice.averageSellPrice
      }
    });
  }

  protected readonly localStorage = localStorage;
  protected readonly BigInt = BigInt;
}
