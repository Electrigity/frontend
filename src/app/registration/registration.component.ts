import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UsernameService} from "../username.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  constructor(private router: Router, private usernameService: UsernameService) { }
  username : string = '';
  password : string = '';
  dob : Date = new Date();
  checked : boolean = false;
  usersMap : Map<string, string> = new Map<string, string>();

  events : any[]  = [
    {title: 'Registration', icon: 'pi pi-circle-fill'},
    {title: 'Billed', icon: 'pi pi-circle'},
    {title: 'Confirmation', icon: 'pi pi-circle'}
  ]

  isValidUsername(username:string): boolean {
    return (username.length >= 6 && username.length <= 15 && /^[a-zA-Z0-9]+$/.test(username));
}

  isValidPassword(password: string): boolean {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;

    return (
      symbolRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      password.length >= 8 && password.length <=16
    );
  }

  calculateAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    if (today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDay())) {
        age--;
    }``

    return age;
  }
  OnClickNext(){
    if(this.username.length == 0 || this.password.length == 0) {
      alert("Please input the required fields.")
    }
    if(this.username.length != 0 && !this.isValidUsername(this.username)) {
      alert("Username must only contain letters and numbers, and must be 6-15 characters long.")
    }

    if(this.usersMap.has(this.username)) {
      alert("Username already exists, please be creative.")
    }

    if(this.password.length != 0 && !this.isValidPassword(this.password)) {
      alert("Password must be 8-16 characters long, and contain one symbol, one number and one lowercase character.")
    }

    if(this.calculateAge(this.dob) < 16) {
      alert("Age must be above 16.")
    }

    if (!this.checked){
      alert("You must read the Terms & Conditions before proceeding!")
    }

    if(this.isValidUsername(this.username) && this.isValidPassword(this.password) && this.checked
      && !this.usersMap.has(this.username) && this.calculateAge(this.dob) >= 16) {
      this.usersMap.set(this.username, this.password)
      this.usernameService.setUsername(this.username);
      this.router.navigate(['/billing']);
    }
  }

  OnClickBack() {

  }
}
