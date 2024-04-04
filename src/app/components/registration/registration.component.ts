import {Component, ElementRef, ViewChild} from '@angular/core';
import {Map, Marker, NavigationControl, Popup} from "maplibre-gl";
import {RegistrationService} from "../../services/registration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  constructor(private router: Router, private _registrationService: RegistrationService) {
  }

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  ngAfterViewInit() {
    const myAPIKey = '355084142fcc42eea656c31df0d782ac';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';

    // this.userCoordinates = data['userCoordinates']
    // this.otherUsersCoordinates = data['otherUsersCoordinates']
    // console.log(this.userCoordinates)
    // console.log(this.otherUsersCoordinates)

    const initialState = {
      // @ts-ignore
      lng: 35.504694,
      // @ts-ignore
      lat: 33.885055,
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

      console.log(`Selected location: ${clickCoords}`);

    })

    // @ts-ignore
    marker.on('dragend', (event) => {
      const newLocation = event.target.getLngLat();
      const latitude = newLocation.lat;
      const longitude = newLocation.lng;

      // Use the extracted coordinates for further processing, e.g., display in UI, send to server, etc.
      console.log(`Selected location: lat: ${latitude}, lng: ${longitude}`);
    });

  }

  async loginUser() {
    // const userId = await this._registrationService.getCurrentUserId()
    // localStorage.setItem("currentUser", userId)
    //
    // if(localStorage.getItem("currentUser") != null) {
    //   this.router.navigate(['/home'])
    // }
  }

  ngOnInit() {
    const userId = localStorage.getItem("currentUser")

    if(userId != null) {
      this.router.navigate(['/home'])
    }
  }

}
