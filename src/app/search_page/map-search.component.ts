import {Component, ViewChild, ElementRef} from '@angular/core';
import {Map, Marker, NavigationControl, Popup} from 'maplibre-gl';
import {HttpClient} from "@angular/common/http";
import {MapUser} from "./models/MapUser";

@Component({
  selector: 'app-search-options',
  templateUrl: './map-search.component.html',
  styleUrl: './map-search.component.scss'
})
export class MapSearchComponent {
  username! : string;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  private userCoordinates!: Object;
  private otherUsersCoordinates!: MapUser[];
  private map! : Map

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const myAPIKey = '355084142fcc42eea656c31df0d782ac';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/positron/style.json';

    this.http.get('/assets/map-data.json', {responseType: 'json'})
      .subscribe((data: any) => {
        this.userCoordinates = data['userCoordinates']
        this.otherUsersCoordinates = data['otherUsersCoordinates']
        console.log(this.userCoordinates)
        console.log(this.otherUsersCoordinates)

        const initialState = {
          // @ts-ignore
          lng: this.userCoordinates.longitude,
          // @ts-ignore
          lat: this.userCoordinates.latitude,
          zoom: 14
        };

        this.map = new Map({
          container: this.mapContainer.nativeElement,
          style: `${mapStyle}?apiKey=${myAPIKey}`,
          center: [initialState.lng, initialState.lat],
          zoom: initialState.zoom,
        });

        this.map.addControl(new NavigationControl());

        new Marker({
          color: '#ff745c',
        })
          // @ts-ignore
          .setLngLat([this.userCoordinates.longitude, this.userCoordinates.latitude])
          .addTo(this.map)

        for (const userCoords of this.otherUsersCoordinates) {
          let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
            'Fusce molestie massa eu dapibus cursus.' +
            'In tellus mauris, posuere ut cursus a, dictum sit amet est.' +
            'Nam magna orci, convallis nec.'
          const htmlContent = `
          <div style="width: 10rem;">
            <p style="font-weight: bold; text-decoration: underline">${userCoords.username}</p>
            <p>Current status:
                <span style="color: #5c77ff">${userCoords.status == "BUYING" ? "Buying" : "Selling"}</span>
            </p>
            <p>Energy amount: ${userCoords.energy} kWh</p>
            <p>Transaction valid until: ${userCoords.validUntil}</p>
            <p><span style="color: green">Price:</span> \$${userCoords.price}</p>
            <div style="display: flex; justify-content: center">
              <button style="cursor: pointer; background: #5c77ff; color: whitesmoke">
              ${userCoords.status == "SELLING" ? `Buy from ${userCoords.username}` : `Sell to ${userCoords.username}`}
              </button>
            </div>
          </div>

          `
          const fragment = document.createRange().createContextualFragment(htmlContent);
          let popup = new Popup()
            .setLngLat([userCoords.longitude, userCoords.latitude])
            .setDOMContent(fragment)

          let marker = new Marker({
            color: '#5c77ff',
          })
            .setLngLat([userCoords.longitude, userCoords.latitude])
            .addTo(this.map)

          marker.setPopup(popup)

          marker.getElement().addEventListener('click', () => {
            if (marker.getPopup().isOpen()) {
              marker.getPopup().remove()
            } else {
              marker.getPopup().addTo(this.map)
              marker.togglePopup()
            }
          });
          marker.getElement().style.cursor = 'pointer';
        }
      })


  }

  searchByUsername() {
    for(const user of this.otherUsersCoordinates) {
      //@ts-ignore
      let username = user.username;
      if(this.username == username) {
        console.log(this.username)
        this.map.flyTo({
          // @ts-ignore
          center: [user.longitude, user.latitude],
          zoom: 16
        });
      }
    }
  }

}
