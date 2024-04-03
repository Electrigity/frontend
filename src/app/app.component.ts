import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Electrigity';

  constructor(private router: Router, private _apiService: ApiService) {
  }

  async ngOnInit() {

  }

}
