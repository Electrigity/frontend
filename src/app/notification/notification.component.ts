import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  messages: Message[] = [];
  trader : string[] = ['bitcoinking69', 'fypteam2023', 'wissamchadizahi']
  energy : number[] = [40, 25, 30]
  severity : string[] = ['success', 'warn', 'error']
  constructor() {}

  ngOnInit() {
    this.messages = [
      { severity: this.severity[0], detail: 'You have successfully traded ' + this.energy[0] + 'KW of energy with ' + this.trader[0]},
      { severity: this.severity[1], detail: 'You have a currently pending transaction of ' + this.energy[1] + 'KW of energy to be traded with ' + this.trader[1]},
      { severity: this.severity[2], detail: 'The transaction of ' + this.energy[2] + 'KW of energy with ' + this.trader[2] + ' was terminated. No energy was traded.'}
    ];
  }
}
