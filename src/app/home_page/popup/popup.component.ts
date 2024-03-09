import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  timeRemaining!: number;
  interval: any;
  sellingEnergy!: number;
  buyingEnergy!: number;
  sellingPrice!: number;
  buyingPrice!: number;
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  constructor() { }
  ngOnInit(): void {
    this.startTimer();
    this.items = [
      { label: 'Buy', icon: 'pi pi-fw pi-shopping-cart' },
      { label: 'Sell', icon: 'pi pi-fw pi-money-bill'}
    ];

    this.activeItem = this.items[0];
  }

  startTimer(): void {
    this.timeRemaining = 15 * 60; // 15 minutes in seconds

    this.interval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        clearInterval(this.interval);
        // Perform functionality when the timer stops
        this.timerFinished();
        // Restart the timer
        this.startTimer();
      }
    }, 1000); // Update every second
  }


  timerFinished(): void {
    console.log('Timer has finished! Perform some functionality here.');
    // You can call a function or perform any other operation here
  }
  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  Confirm() {

  }
}
