import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenPopupService {
  // @ts-ignore
  private open : boolean;

  setOpen(open : boolean) {
    this.open = open;
  }

  getOpen(): boolean {
    return this.open;
  }
}
