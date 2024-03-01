import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Electrigity';

  constructor(private router: Router) {

  }

  ngOnInit() {
    const currentUser = localStorage.getItem("currentUser")

    if(currentUser != null) {
      this.router.navigate(['/home'])
    }
  }

  ngOnChange() {
    const currentUser = localStorage.getItem("currentUser")

    if(currentUser == null) {
      this.router.navigate(['/login'])
    }
  }

}
