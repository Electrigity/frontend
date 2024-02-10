import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  username : string = "bitcoinking69";
  events : any[]  = [
    {title: 'Registration', icon:'pi pi-circle-fill'},
    {title: 'Billed', icon:'pi pi-circle-fill'},
    {title: 'Confirmation', icon:'pi pi-circle-fill'}
  ]
}
