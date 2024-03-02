import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private _filterCompleteSource = new Subject<boolean>();
  private _filterPendingSource = new Subject<boolean>();
  private _filterRejectedSource = new Subject<boolean>();

  filterComplete$ = this._filterCompleteSource.asObservable();
  filterPending$ = this._filterPendingSource.asObservable();
  filterRejected$ = this._filterRejectedSource.asObservable();

  constructor() { }

  selectComplete(filter: boolean) {
    this._filterCompleteSource.next(filter);
  }
  selectPending(filter: boolean) {
    this._filterPendingSource.next(filter);
  }
  selectRejected(filter: boolean) {
    this._filterRejectedSource.next(filter);
  }
}
