import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  appTitle: string = 'ELECTRIGITY';
  selectedMenuItem! : number;
  style! : string;


  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length > 0) {
        const path = urlSegments[0].path;
        if (path === 'home') {
          this.selectedMenuItem = 1
        } else if(path == 'search-options'){
          this.selectedMenuItem = 2
        } else if(path == 'operator') {
          this.selectedMenuItem = 3
        } else if(path == 'questions') {
          this.selectedMenuItem = 4
        }
      }
    });
  }
  ngOnInit() {
    if(this.selectedMenuItem == 1) {
      this.homeMenuItem.styleClass = 'widget-selected-menu'
    } else if(this.selectedMenuItem == 2) {
      this.searchMenuItem.styleClass = 'widget-selected-menu'
    } else if(this.selectedMenuItem == 3) {
      this.operatorMenuItem.styleClass = 'widget-selected-menu'
    } else if(this.selectedMenuItem == 4) {
      this.questionsMenuitem.styleClass = 'widget-selected-menu'
    }
  }
  homeMenuItem: MenuItem = {
    label: 'Home',
    icon: 'pi pi-home',
    routerLink: '/home',
    styleClass: 'widget'
  }

  searchMenuItem: MenuItem = {
    label: 'Search',
    icon: 'pi pi-search',
    routerLink: '/search-options',
    styleClass: 'widget'
  }
  operatorMenuItem: MenuItem = {
    label: 'Operator',
    icon: 'pi pi-phone',
    styleClass:  'widget'
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
