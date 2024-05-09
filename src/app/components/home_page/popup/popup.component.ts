import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
import {ApiService} from "../../../services/api.service";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  timeRemaining!: number;
  interval: any;
  sellingEnergy!: number;
  buyingEnergy!: number;
  sellingPrice!: number;
  buyingPrice!: number;

  numberOfBuyers!: number;
  numberOfSellers!: number;
  averageBuyPrice!: number;
  averageSellPrice!: number;

  items: MenuItem[] | undefined;
  activeIndex : number = 0;

  activeItem: MenuItem | undefined;

  constructor(private _apiService: ApiService, private _dialogConfig: DynamicDialogConfig) { }
  async ngOnInit() {
    const timestamp = await this._apiService.getTimestamp()
    this.timeRemaining = Math.ceil(15 * 60 - (Date.now() - timestamp) / 1000)
    if(this.timeRemaining <= 0) {
      this.timeRemaining = 0
    }
    this.numberOfBuyers = this._dialogConfig.data.numberOfBuyers
    this.numberOfSellers = this._dialogConfig.data.numberOfSellers
    this.averageBuyPrice = this._dialogConfig.data.averageBuyPrice
    this.averageSellPrice = this._dialogConfig.data.averageSellPrice

    this.startTimer();
    this.items = [
      {label: 'Buy', icon: 'pi pi-fw pi-shopping-cart'},
      {label: 'Sell', icon: 'pi pi-fw pi-money-bill'}
    ];

    this.activeItem = this.items[0];
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeRemaining <= 0) {
        clearInterval(this.interval)
        console.log("Hello")
      } else {
        this.timeRemaining--;
      }
    }, 1000);
  }


  async timerFinished(): Promise<void> {
    await this._apiService.matchOrders()
  }
  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  async confirmBuy() {
    await this._apiService.placeIndirectOrder(
      this.buyingEnergy,
      this.buyingPrice,
      true
    )
  }
  async confirmSell() {
    await this._apiService.placeIndirectOrder(
      this.sellingEnergy,
      this.sellingPrice,
      false
    )
  }
}
