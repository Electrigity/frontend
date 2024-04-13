import { Component } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.scss'
})
export class UserSidebarComponent {

  selectedStatus: string | undefined;
  selectedEnergy: number | undefined;
  selectedPrice!: number | undefined;
  selectedDate!: Date;

  statuses = [
    'Buying',
    'Selling',
    'Not trading'
  ]


  printVars() {
    console.log(this.selectedDate.valueOf())
  }

}
