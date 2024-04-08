import {Component, Input} from '@angular/core';
import {popNumber} from "rxjs/internal/util/args";

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss'
})
export class TextBoxComponent {
  @Input() title: string = 'Direct trading settings'
  @Input() status: string = 'Buying'
  @Input() transactionPrice: number = 5
  @Input() expiryDate: string = 'Monday'
}
