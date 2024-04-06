import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  trader: string = "karim123"
  energyAmount: number = 45
  isBuying : boolean = true

  accept(){

  }

  reject(){

  }

  getTransactionType() : string {
    return (this.isBuying) ? 'purchase' : 'sell'
  }

}
