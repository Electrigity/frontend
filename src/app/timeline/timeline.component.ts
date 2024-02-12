import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UsernameService} from "../username.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  constructor(private router: Router, private usernameService: UsernameService) {
  }
  username: string = '';
  ngOnInit() {
    // Retrieve the username from the service
    this.username = this.usernameService.getUsername();
  }
  events : any[]  = [
    {title: 'Registration', icon:'pi pi-circle-fill'},
    {title: 'Billed', icon:'pi pi-circle-fill'},
    {title: 'Confirmation', icon:'pi pi-circle-fill'}
  ]
  OnClickDone(){

  }
}
