import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import moment from "moment";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() trader: string = ""
  @Input() energyAmount: number = 0
  @Input() price: number = 0
  @Input() isBuying : boolean = true
  @Input() date: Date = new Date()
  @Input() transactionId: number = -1

  constructor(private _apiService: ApiService) {
  }

  async accept(){
   await this._apiService.commitTransaction(this.transactionId, true)
  }

  async reject(){
    await this._apiService.commitTransaction(this.transactionId, false)
  }

  getTransactionType() : string {
    return (this.isBuying) ? 'purchase' : 'sell'
  }

  protected readonly moment = moment;
}
