import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private _filterAcceptedSource = new Subject<boolean>();
  private _filterRejectedSource = new Subject<boolean>();

  filterAccepted$ = this._filterAcceptedSource.asObservable();
  filterRejected$ = this._filterRejectedSource.asObservable();

  constructor() { }

  selectAccepted(filter: boolean) {
    this._filterAcceptedSource.next(filter);
  }
  selectRejected(filter: boolean) {
    this._filterRejectedSource.next(filter);
  }
}
