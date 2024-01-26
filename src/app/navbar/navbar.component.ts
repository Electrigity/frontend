import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  appTitle: string = 'ELECTRIGITY';
  searchMenuItem: MenuItem = {
    label: 'Search',
    icon: 'pi pi-search',
    styleClass: 'widget'
  }
  operatorMenuItem: MenuItem = {
    label: 'Operator',
    icon: 'pi pi-phone',
    styleClass: 'widget'
  }
  questionsMenuitem: MenuItem = {
    label: 'Questions',
    icon: 'pi pi-question-circle',
    styleClass: 'widget'
  }
  items: MenuItem[] = [this.searchMenuItem, this.operatorMenuItem, this.questionsMenuitem]
}
