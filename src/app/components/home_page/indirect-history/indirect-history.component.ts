import {Component, Input} from '@angular/core';
import moment from "moment/moment";
import {capitalize} from "lodash";
import {IndirectTrade} from "../../../models/IndirectTrade";

@Component({
  selector: 'app-indirect-history',
  templateUrl: './indirect-history.component.html',
  styleUrl: './indirect-history.component.scss'
})
export class IndirectHistoryComponent {
    @Input() tradeHistory: IndirectTrade[] = []

    protected readonly moment = moment;
    protected readonly capitalize = capitalize;
}
