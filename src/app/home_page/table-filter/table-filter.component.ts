import { Component } from '@angular/core';
import {TableService} from "../services/table.service";

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrl: './table-filter.component.scss'
})
export class TableFilterComponent {
  filterComplete!: boolean;
  filterPending!: boolean;
  filterRejected!: boolean;

  constructor(private _tableService: TableService) {}
  ngOnInit() {
    this.filterComplete = false;
    this.filterPending = false;
    this.filterRejected = false;
  }

  filterTableByComplete() {
    this.filterComplete = !this.filterComplete;
    this.filterPending = false;
    this.filterRejected = false;

    this._tableService.selectComplete(this.filterComplete);
    this._tableService.selectPending(this.filterPending);
    this._tableService.selectRejected(this.filterRejected);
    //console.log(this.filterComplete)
  }
  filterTableByPending() {
    this.filterComplete = false;
    this.filterPending = !this.filterPending;
    this.filterRejected = false;

    this._tableService.selectComplete(this.filterComplete);
    this._tableService.selectPending(this.filterPending);
    this._tableService.selectRejected(this.filterRejected);
  }
  filterTableByRejected() {
    this.filterComplete = false;
    this.filterPending = false;
    this.filterRejected = !this.filterRejected;

    this._tableService.selectComplete(this.filterComplete);
    this._tableService.selectPending(this.filterPending);
    this._tableService.selectRejected(this.filterRejected);
  }
}
