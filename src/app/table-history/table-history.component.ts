import {Component, Injectable, OnChanges, SimpleChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TableService} from "../services/table.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrl: './table-history.component.scss'
})
export class TableHistoryComponent implements OnChanges{

  filterComplete!: boolean;
  filterPending!: boolean;
  filterRejected!: boolean;

  fullPaymentHistory!: Object[];
  paymentHistory!: Object[];

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

  ngOnInit() {
    this.getPaymentHistoryJson()
  }
  getPaymentHistoryJson() {
    this.http.get('/assets/test.json', {responseType: 'json'})
      .subscribe((data: any) => {
        this.fullPaymentHistory = data;
        this.paymentHistory = this.fullPaymentHistory;
        console.log(this.fullPaymentHistory)
      })
  }
  getCompletePayments() {
    // @ts-ignore
    return this.fullPaymentHistory.filter(entry => entry.transactionStatus === 'SUCCESS')
  }
  getPendingPayments() {
    // @ts-ignore
    return this.fullPaymentHistory.filter(entry => entry.transactionStatus === 'PENDING')
  }
  getRejectedPayments() {
    // @ts-ignore
    return this.fullPaymentHistory.filter(entry => entry.transactionStatus === 'REJECTED')
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
}
