import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {SidebarService} from "../../services/sidebar.service";
import {NotificationComponent} from "./notification/notification.component";
import {ApiService} from "../../services/api.service";
import {UserInfo} from "../../models/UserInfo";
import {PopupComponent} from "./popup/popup.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {StyleClass, StyleClassModule} from "primeng/styleclass";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  toggledNotifications: boolean = false;
  ref: DynamicDialogRef | undefined;
  @ViewChild('notificationsRef') notificationsRef!: NotificationComponent

  userId!: string
  userInfo!: UserInfo
  username!: string

  constructor(
    private router: Router,
    public _sidebarService: SidebarService,
    private _apiService: ApiService,
    private _dialogService: DialogService,
  ) { }


  async ngOnInit() {
    this.userId = localStorage.getItem("currentUser")!
    this.userInfo  = await this._apiService.getUserInfo(this.userId)
    this.username = this.userInfo.username
    if(this.userId == null || !(await this._apiService.isUserRegistered(this.userId))) {
      this.router.navigate(['/login'])
    }
  }

  show() {
    this.ref = this._dialogService.open(PopupComponent, {  width: '50vw'});
  }

  protected readonly localStorage = localStorage;
}
