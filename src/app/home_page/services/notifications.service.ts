import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private toggled = false;
  private firstClick: boolean = false;
  private _showNotifications = new Subject<boolean>();
  showNotifications$ = this._showNotifications.asObservable();
  constructor() { }

  toggleNotifications() {
    this.toggled = !this.toggled;
    console.log(this.toggled)
    this._showNotifications.next(this.toggled)
  }

  toggleFirstClick() {
    this.firstClick = !this.firstClick;
  }

  isFirstClick() {
    return this.firstClick;
  }

  getToggleStatus() {
    return this.toggled;
  }

}
