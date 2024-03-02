import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  appTitle: string = 'ELECTRIGITY';

  homeMenuItem: MenuItem = {
    label: 'Home',
    icon: 'pi pi-home',
    styleClass: 'widget',
    routerLink: '/home'
  }

  searchMenuItem: MenuItem = {
    label: 'Search',
    icon: 'pi pi-search',
    styleClass: 'widget',
    routerLink: '/search-options'
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
  items: MenuItem[] = [
    this.homeMenuItem,
    this.searchMenuItem,
    this.operatorMenuItem,
    this.questionsMenuitem
  ]
}
