import { Component } from '@angular/core';
import {TableService} from "../../../services/table.service";

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrl: './table-filter.component.scss'
})
export class TableFilterComponent {
  filterAccepted!: boolean;
  filterRejected!: boolean;

  constructor(private _tableService: TableService) {}
  ngOnInit() {
    this.filterAccepted = false;
    this.filterRejected = false;
  }

  filterTableByAccepted() {
    this.filterAccepted = !this.filterAccepted;
    this.filterRejected = false;

    this._tableService.selectAccepted(this.filterAccepted);
    this._tableService.selectRejected(this.filterRejected);
    //console.log(this.filterComplete)
  }
  filterTableByPending() {
    this.filterAccepted = false;
    this.filterRejected = false;

    this._tableService.selectAccepted(this.filterAccepted);
    this._tableService.selectRejected(this.filterRejected);
  }
  filterTableByRejected() {
    this.filterAccepted = false;
    this.filterRejected = !this.filterRejected;

    this._tableService.selectAccepted(this.filterAccepted);
    this._tableService.selectRejected(this.filterRejected);
  }
}
