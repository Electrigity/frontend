import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
