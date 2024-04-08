import {Component, ElementRef, ViewChild} from '@angular/core';
import {Map, Marker, NavigationControl} from "maplibre-gl";
import {ConfirmationService, MessageService} from "primeng/api";
import {RegistrationService} from "../../../services/registration.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
activeIndex : number = 0;
username!: string;
constructor(private _registrationService: RegistrationService, private confirmationService: ConfirmationService, private messageService: MessageService) {}
  choosenCoordinates = {
    longitude: -1,
    latitude: -1
  }
  isValidUsername(username:string): boolean {
    return (username.length >= 6 && username.length <= 15 && /^[a-zA-Z0-9]+$/.test(username));
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to change your username?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      key: "changeUsername",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        if(this.username.length != 0 && !this.isValidUsername(this.username)) {
          alert("Username must only contain letters and numbers, and must be 6-15 characters long.")
        } else {
          this._registrationService.setUsername(this.username);
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }
  // changeUsername() {
  //   if(this.username.length != 0 && !this.isValidUsername(this.username)) {
  //     alert("Username must only contain letters and numbers, and must be 6-15 characters long.")
  //   } else {
  //     this._registrationService.setUsername(this.username);
  //   }
  // }

  // changeLocation() {
  //   this._registrationService.setUserCoordinates(this.choosenCoordinates)
  // }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to change your location?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      key: "changeLocation",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        this._registrationService.setUserCoordinates(this.choosenCoordinates)
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  confirm3(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete your account?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      key: "deleteUser",
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }


  deleteUser() {

  }
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  ngAfterViewInit() {
    const myAPIKey = '355084142fcc42eea656c31df0d782ac';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';


    navigator.geolocation.getCurrentPosition((position) => {

      const initialState = {
        // @ts-ignore
        lng: position.coords.longitude,
        // @ts-ignore
        lat: position.coords.latitude,
        zoom: 13
      };

      const map = new Map({
        container: this.mapContainer.nativeElement,
        style: `${mapStyle}?apiKey=${myAPIKey}`,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
      });

      map.addControl(new NavigationControl());

      const marker = new Marker({
        color: '#ff745c',
      })
        // @ts-ignore
        .setLngLat([initialState.lng, initialState.lat])
        .setDraggable(true)
        .addTo(map)

      map.on('click', (event) => {
        const clickCoords = event.lngLat;
        marker.setLngLat(clickCoords)

        this.choosenCoordinates.longitude = clickCoords.lng;
        this.choosenCoordinates.latitude = clickCoords.lat;

      })

      // @ts-ignore
      marker.on('dragend', (event) => {
        const newLocation = event.target.getLngLat();

        this.choosenCoordinates.longitude = newLocation.lng;
        this.choosenCoordinates.latitude = newLocation.lat;
      });
    })
  }
}
