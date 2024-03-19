import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NotificationsService} from "./services/notifications.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {PopupComponent} from "./popup/popup.component";
import {Footer, MessageService} from "primeng/api";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  title = 'Electrigity';
  toggledNotifications: boolean = false;
  ref: DynamicDialogRef | undefined;
  @ViewChild('notificationsRef') notificationsRef!: ElementRef<HTMLElement>
  private firstClick: boolean = false;

  constructor(
    private router: Router,
    private _notificationsService: NotificationsService,
    public dialogService: DialogService,
  ) {
    _notificationsService.showNotifications$.subscribe(
      toggled => {
        this.toggledNotifications = toggled;
      }
    )
    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement; // Get the clicked element

      if(this._notificationsService.isFirstClick()) {
        _notificationsService.toggleNotifications();
        _notificationsService.toggleFirstClick();
      }
      if (this.toggledNotifications && !this.notificationsRef.nativeElement.contains(target)) {
        _notificationsService.toggleFirstClick();
        console.log('Clicked outside')
      }
    });


  }

  totalEnergyBoughtBox = {
    'title': 'Total Energy Bought',
    'powerValue': 450,
    'price': 345.69,
    'date': 'as of 01-December 2022'
  }
  pendingPaymentsBox = {
    'title': 'Pending Payments',
    'powerValue': 37,
    'price': 69.42,
    'date': 'as of 01-December 2022'
  }
  accountBalanceBox =  {
    'title': 'Account Balance',
    'balance': 690.42,
    'date': '',
    'isAccountBalance' : true
  }

  ngOnInit() {
    const currentUser = localStorage.getItem("currentUser")

    if(currentUser == null) {
      this.router.navigate(['/login'])
    }
  }

    protected readonly localStorage = localStorage;


  show() {
    this.ref = this.dialogService.open(PopupComponent, {  width: '50vw'});
   }

  // ngOnDestroy() {
  //   if (this.ref) {
  //     this.ref.close();
  //   }
  // }
}
