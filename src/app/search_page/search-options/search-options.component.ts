import {Component, ViewChild, ElementRef} from '@angular/core';
import {Map, Marker, NavigationControl, Popup} from 'maplibre-gl';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrl: './search-options.component.scss'
})
export class SearchOptionsComponent {
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  private userCoordinates!: Object;
  private otherUsersCoordinates!: Object[];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

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

        const map = new Map({
          container: this.mapContainer.nativeElement,
          style: `${mapStyle}?apiKey=${myAPIKey}`,
          center: [initialState.lng, initialState.lat],
          zoom: initialState.zoom,
        });

        map.addControl(new NavigationControl());

        new Marker({
          color: '#ff745c',
        })
          // @ts-ignore
          .setLngLat([this.userCoordinates.longitude, this.userCoordinates.latitude])
          .addTo(map)

        for (const userCoords of this.otherUsersCoordinates) {
          let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
            'Fusce molestie massa eu dapibus cursus.' +
            'In tellus mauris, posuere ut cursus a, dictum sit amet est.' +
            'Nam magna orci, convallis nec.'
          const htmlContent = `
          <p>${text}</p>
          <div style="display: flex; justify-content: center">
            <button style="cursor: pointer">Trade</button>
          </div>
          `
          const fragment = document.createRange().createContextualFragment(htmlContent);
          let popup = new Popup()
            // @ts-ignore
            .setLngLat([userCoords.longitude, userCoords.latitude])
            .setDOMContent(fragment)

          let marker = new Marker({
            color: '#5c77ff',
          })
            // @ts-ignore
            .setLngLat([userCoords.longitude, userCoords.latitude])
            .addTo(map)

          marker.setPopup(popup)

          marker.getElement().addEventListener('click', () => {
            if (marker.getPopup().isOpen()) {
              console.log('Popup removing')
              marker.getPopup().remove()
            } else {
              console.log('Popup toggled')
              marker.getPopup().addTo(map)
              marker.togglePopup()
            }
          });
          marker.getElement().style.cursor = 'pointer';
        }
      })


  }

}
