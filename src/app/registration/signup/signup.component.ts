import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RegistrationService} from "../service/registration.service";
import {Map, Marker, NavigationControl} from "maplibre-gl";

@Component({
  selector: 'app-registration',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private router: Router,
              private _registrationService: RegistrationService
              ) { }

  userId: string = '';
  userConnected: boolean = false;

  username : string = '';
  checked : boolean = false;
  choosenCoordinates = {
    longitude: -1,
    latitude: -1
  }

  events : any[]  = [
    {title: 'Registration', icon: 'pi pi-circle-fill'},
    {title: 'Billed', icon: 'pi pi-circle'},
    {title: 'Confirmation', icon: 'pi pi-circle'}
  ]

  async connectUser() {
    if(!this.userConnected) {
      var tempUserId = await this._registrationService.getCurrentUserId()

      if(tempUserId != null) {
       this.userId = tempUserId;
       this.userConnected = true;
      }
    }
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

  isValidUsername(username:string): boolean {
    return (username.length >= 6 && username.length <= 15 && /^[a-zA-Z0-9]+$/.test(username));
}

  onClickNext(){
    if(this.userId.length == 0) {
      alert("Please connect your MetaMask wallet.")
    }
    else if(this.username.length == 0) {
      alert("Please input the required fields.")
    }
    else if(this.username.length != 0 && !this.isValidUsername(this.username)) {
      alert("Username must only contain letters and numbers, and must be 6-15 characters long.")
    }

    else if (!this.checked){
      alert("You must read the Terms & Conditions before proceeding!")
    }

    if(this.isValidUsername(this.username) && this.checked) {
      this._registrationService.setUsername(this.username);
      this._registrationService.setUserId(this.userId);
      this._registrationService.setUserCoordinates(this.choosenCoordinates);

      this.router.navigate(['/billing']);
    }
  }

  onClickBack() {
    this.router.navigate(['/login']);
  }
}
