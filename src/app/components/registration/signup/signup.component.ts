import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RegistrationService} from "../../../services/registration.service";
import {Map, Marker, NavigationControl} from "maplibre-gl";
import {ApiService} from "../../../services/api.service";
import {RegisteringUser} from "../../../models/RegisteringUser";

@Component({
  selector: 'app-registration',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private router: Router,
              private _registrationService: RegistrationService,
              private _apiService: ApiService
              ) { console.log(this.registeringUser)}

  registeringUser: RegisteringUser = new RegisteringUser()
  userConnected: boolean = false;
  checked : boolean = false;

  events : any[]  = [
    {title: 'Registration', icon: 'pi pi-circle-fill'},
    {title: 'Billed', icon: 'pi pi-circle'},
    {title: 'Confirmation', icon: 'pi pi-circle'}
  ]

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  ngAfterViewInit() {
    const myAPIKey = '355084142fcc42eea656c31df0d782ac';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/dark-matter-brown/style.json';


    navigator.geolocation.getCurrentPosition((position) => {

      const initialState = {
        // @ts-ignore
        lng: position.coords.longitude,
        // @ts-ignore
        lat: position.coords.latitude,
        zoom: 12.9
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

        this.registeringUser.longitude = clickCoords.lng;
        this.registeringUser.latitude = clickCoords.lat;

      })

      // @ts-ignore
      marker.on('dragend', (event) => {
        const newLocation = event.target.getLngLat();

        this.registeringUser.longitude = newLocation.lng;
        this.registeringUser.latitude = newLocation.lat;
      });
    })
  }

  async connectUser() {
    if(!this.userConnected) {
      const userId = await this._apiService.getCurrentUserId()
      if (userId != null) {
        this.registeringUser.userId = userId
        this.userConnected = true
      }
    }
  }

  isValidUsername(username:string): boolean {
    return (username.length >= 6 && username.length <= 15 && /^[a-zA-Z0-9]+$/.test(username));
}

  async onClickNext(){
    if(this.registeringUser.userId == undefined) {
      alert("Please connect your MetaMask wallet.")
    }
    else if(this.registeringUser.username.length == 0) {
      alert("Please input the required fields.")
    }
    else if(!this.isValidUsername(this.registeringUser.username)) {
      alert("Username must only contain letters and numbers, and must be 6-15 characters long.")
    }

    else if (!this.checked){
      alert("You must read the Terms & Conditions before proceeding!")
    }
    else if(!(await this._registrationService.isUniqueUsername(this.registeringUser.username))) {
      alert("Username already exists. Please choose another one.")
    }
    else if(await this._apiService.isUserRegistered(this.registeringUser.userId)) {
      alert("Your MetaMask wallet ID is already registered.")
    }

    else if(this.isValidUsername(this.registeringUser.username) && this.checked) {
      this._registrationService.setUsername(this.registeringUser.username);
      this._registrationService.setUserId(this.registeringUser.userId);
      this._registrationService.setUserCoordinates({
        longitude: this.registeringUser.longitude,
        latitude: this.registeringUser.latitude
      });

      this.router.navigate(['/billing']);
    }
  }

  onClickBack() {
    this.router.navigate(['/login']);
  }
}
