import { Component } from '@angular/core';
import { RegistrationService } from "../service/registration.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  bgImageUrl = '/assets/electricity_bg3.jpeg';
constructor(private _registrationService: RegistrationService, private router: Router) {}

  ngOnInit() {
    const userId = localStorage.getItem("currentUser")

    if(userId != null) {
      this._registrationService.setUserId(userId)
      this.router.navigate(['/home'])
    }
  }

  async onClickLogin() {
    const userId = await this._registrationService.getCurrentUserId()
    localStorage.setItem("currentUser", userId)

    if(localStorage.getItem("currentUser") != null) {
      this._registrationService.setUserId(userId)
      this.router.navigate(['/home'])
    }
  }

  onClickSignup() {
    this.router.navigate(['/signup']);
  }
}
