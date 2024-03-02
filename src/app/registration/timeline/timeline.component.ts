import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RegistrationService} from "../service/registration.service";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

  userId = '';
  username = '';
  userCoordinates = {
    longitude: -1,
    latitude: -1
  };

  constructor(private router: Router, private _registrationService: RegistrationService) {
  }
  ngOnInit() {
    this.username = this._registrationService.getUsername();
    this.userId = this._registrationService.getUserId();
    this.userCoordinates = this._registrationService.getUserCoordinates();

    localStorage.setItem('currentUser', this.userId)
  }
  events : any[]  = [
    {title: 'Registration', icon:'pi pi-circle-fill'},
    {title: 'Billed', icon:'pi pi-circle-fill'},
    {title: 'Confirmation', icon:'pi pi-circle-fill'}
  ]
  onClickDone(){
    this.router.navigate(['/home'])
  }
}
