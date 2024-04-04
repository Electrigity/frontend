import {Component, Input} from '@angular/core';
import {popNumber} from "rxjs/internal/util/args";

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss'
})
export class TextBoxComponent {
  @Input() boxTitle: string = 'Total Energy Bought';
  @Input() boxInfo: string = '450.00 KW - 345.69 $';
  @Input() boxDate: string = 'as of 01-December 2022';
  @Input() backgroundColor: string = 'rgb(177, 250, 179)';
  @Input() infoTextColor: string = 'green';
  @Input() isAccountBalance: boolean = false;
  protected readonly popNumber = popNumber;
}
