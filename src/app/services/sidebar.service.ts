import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _sidebarVisible: boolean = false;
  constructor() { }
  get sidebarVisible(): boolean {
    return this._sidebarVisible;
  }

  set sidebarVisible(value: boolean) {
    this._sidebarVisible = value;
  }
}
