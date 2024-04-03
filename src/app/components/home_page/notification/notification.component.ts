import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Message } from 'primeng/api';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @ViewChild('element') element!: ElementRef
  messages!: Message[];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.http.get('/assets/notifications-data.json', {responseType: 'json'}).subscribe(
      (data: any) => {
        let messagesList: Message[] = [];
        for(const trade of data) {
          // @ts-ignore
          let trader = trade.trader;
          // @ts-ignore
          let energy = trade.energy;
          let status = '';
          let detail = '';
          // @ts-ignore
          switch (trade.status) {
            case "success":
              status = "success"
              detail = `You have successfully traded ${energy} kWh of energy with ${trader}.`
              break;
            case "pending":
              status = "warn"
              detail = `You have a currently pending transaction of ${energy} kWh of energy to be traded with ${trader}.`
              break;
            default:
              status = "error"
              detail = `The transaction of ${energy} kWh of energy with ${trader} was terminated. No energy was traded.`
          }

          messagesList.push(
            {
              severity: status,
              detail: detail
            }
          )
        }
        this.messages = messagesList;
      }
    )
  }



}
