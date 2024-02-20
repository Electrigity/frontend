import { Component } from '@angular/core';
import {OpenPopupService} from "../services/openPopup.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  constructor(private openPopupService : OpenPopupService) {}
  open : boolean = false;
  ngOnInit() : void {
    this.open = this.openPopupService.getOpen();
  }
}
