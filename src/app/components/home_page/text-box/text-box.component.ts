import {Component, Input} from '@angular/core';
import {UserTradingInfo} from "../../../models/UserTradingInfo";
import moment from "moment/moment";

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss'
})
export class TextBoxComponent {
  @Input() title!: string
  @Input() tradingInfo!: UserTradingInfo
  @Input() date!: Date

  camelCaseToWords(s: string) {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  protected readonly moment = moment;
}
