import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  title = 'Electrigity';

  totalEnergyBoughtBox = {
    'title': 'Total Energy Bought',
    'powerValue': 450,
    'price': 345.69,
    'date': 'as of 01-December 2022'
  }
  pendingPaymentsBox = {
    'title': 'Pending Payments',
    'powerValue': 37,
    'price': 69.42,
    'date': 'as of 01-December 2022'
  }
  accountBalanceBox =  {
    'title': 'Account Balance',
    'balance': 690.42,
    'date': '',
    'isAccountBalance' : true
  }
}
