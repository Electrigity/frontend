import {Component, Input} from '@angular/core';
import {UserTradingInfo} from "../../../models/UserTradingInfo";
import moment from "moment/moment";
import {IndirectTradeInfo} from "../../../models/IndirectTradeInfo";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss'
})
export class TextBoxComponent {
  @Input() isDirect: boolean = true;
  @Input() title!: string
  @Input() tradingInfo!: UserTradingInfo
  @Input() indirectTradingInfo!: IndirectTradeInfo
  @Input() date!: Date

  constructor(private _apiService: ApiService) {
  }

  camelCaseToWords(s: string) {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  cancelOrder() {
    this._apiService.cancelOrder()
  }

  protected readonly moment = moment;
}
