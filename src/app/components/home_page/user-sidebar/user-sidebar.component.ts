import { Component } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.scss'
})
export class UserSidebarComponent {

  selectedStatus: string | undefined;
  selectedEnergy: number | undefined;
  selectedPrice: number | undefined;
  selectedDate: Date[] | undefined;

  statuses = [
    'Buying',
    'Selling',
    'Not trading'
  ]

  printVars() {
    console.log('Selected status:', this.selectedStatus)
    console.log('Selected energy:', this.selectedEnergy)
    console.log('Selected price:', this.selectedPrice)
    console.log('Selected date:', this.selectedDate)

  }

}
