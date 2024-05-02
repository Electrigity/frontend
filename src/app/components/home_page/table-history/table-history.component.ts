import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../../../services/table.service";
import Moment from "moment";
import {capitalize} from "lodash";
import {CommittedTransaction} from "../../../models/CommittedTransaction";

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrl: './table-history.component.scss'
})
export class TableHistoryComponent implements OnChanges{

  filterComplete!: boolean;
  filterPending!: boolean;
  filterRejected!: boolean;

  @Input() fullPaymentHistory!: CommittedTransaction[];
  paymentHistory!: CommittedTransaction[];

  constructor(private http: HttpClient, private _tableService: TableService) {
    this._tableService.filterComplete$
      .subscribe(
        filter => {
          this.filterComplete = filter;
          if(this.filterComplete) {
            this.paymentHistory = this.getCompletePayments()
          }
          if(!this.filterComplete && !this.filterPending && !this.filterRejected) {
            this.paymentHistory = this.fullPaymentHistory;
          }
        }
      )
    this._tableService.filterPending$
      .subscribe(
        filter => {
          this.filterPending = filter;
          if(this.filterPending) {
            this.paymentHistory = this.getPendingPayments()
          }
          if(!this.filterComplete && !this.filterPending && !this.filterRejected) {
            this.paymentHistory = this.fullPaymentHistory;
          }
        }
      )
    this._tableService.filterRejected$
      .subscribe(
        filter => {
          this.filterRejected = filter;
          if(this.filterRejected) {
            this.paymentHistory = this.getRejectedPayments()
          }
          if(!this.filterComplete && !this.filterPending && !this.filterRejected) {
            this.paymentHistory = this.fullPaymentHistory;
          }
        }
      )
  }

  getCompletePayments() {
    return this.fullPaymentHistory.filter(entry => entry.status === 'Accepted')
  }
  getPendingPayments() {
    return this.fullPaymentHistory.filter(entry => entry.status === 'Pending')
  }
  getRejectedPayments() {
    return this.fullPaymentHistory.filter(entry => entry.status === 'Rejected')
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.paymentHistory = this.fullPaymentHistory
  }

  protected readonly moment = Moment;
  protected readonly capitalize = capitalize;
}
