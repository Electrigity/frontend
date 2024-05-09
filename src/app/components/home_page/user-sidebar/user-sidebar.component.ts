import { Component } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {SidebarService} from "../../../services/sidebar.service";
import {HomePageComponent} from "../home-page.component";

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.scss'
})
export class UserSidebarComponent {

  selectedStatus: string | undefined;
  selectedEnergy: number | undefined;
  selectedPrice!: number | undefined;
  selectedDate!: Date;

  statuses = [
    'Buying',
    'Selling',
    'Not trading'
  ]

  constructor(private _apiService: ApiService, private _sidebarService: SidebarService) {}

  async saveUserInfo() {
    if(this.selectedStatus == 'Not trading') {
      console.log(await this._apiService.updateTradingInfoToNotTrading())
    }
    else if( this.selectedStatus != undefined && this.selectedDate != undefined &&
      this.selectedEnergy != null && this.selectedPrice != undefined) {
      console.log(await this._apiService.updateTradingInfo(
        this.selectedStatus,
        this.selectedDate.valueOf(),
        this.selectedEnergy,
        this.selectedPrice
      ))
      if(this.selectedStatus == 'Buying') {
        await this._apiService.approveTokens(this.selectedPrice)
      }
    }
    this._sidebarService.sidebarVisible = false
  }

}
