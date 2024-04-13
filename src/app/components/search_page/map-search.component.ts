import {Component, ViewChild, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import maplibregl, {MapMouseEvent, Marker, NavigationControl, Popup} from 'maplibre-gl';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import * as _ from "lodash";
import {ConfirmationService} from "primeng/api";

interface MapUser {
  longitude: number;
  latitude: number;
  userId: string;
  username: string;
  status: string;
  energy: number;
  price: number;
  validUntil: Date;
}

interface MarkedUser {
  userId: string,
  marker: Marker
}

@Component({
  selector: 'app-search-options',
  templateUrl: './map-search.component.html',
  styleUrl: './map-search.component.scss'
})
export class MapSearchComponent {
  username!: string;
  formGroup!: FormGroup;
  filteredUsernames!: any[];

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  private userCoordinates!: Object;
  private otherUsersCoordinates!: MapUser[];
  private map!: maplibregl.Map;
  private userMarkers: Map<string, Marker> = new Map<string, Marker>();
  showDialog: boolean = false;
  filteringMap: boolean = false;
  initMapFilters = {
    'statusFilter': '',
    'priceLimit': 0,
    'energyLimit': 0
  }
  committedMapFilters = {
    'statusFilter': '',
    'priceLimit': 0,
    'energyLimit': 0
  }
  tempMapFilters = {
    'statusFilter': '',
    'priceLimit': 0,
    'energyLimit': 0
  }

  constructor(private http: HttpClient, public _confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl<object | null>(null)
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  ngAfterViewInit() {
    const myAPIKey = '355084142fcc42eea656c31df0d782ac';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/dark-matter-brown/style.json';

    this.http.get('/assets/map-data.json', {responseType: 'json'})
      .subscribe((data: any) => {
        this.userCoordinates = data['userCoordinates']
        this.otherUsersCoordinates = data['otherUsersCoordinates']

        const initialState = {
          // @ts-ignore
          lng: this.userCoordinates.longitude,
          // @ts-ignore
          lat: this.userCoordinates.latitude,
          zoom: 12.9
        };

        this.map = new maplibregl.Map({
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
          if (userCoords.price > this.committedMapFilters.priceLimit && this.committedMapFilters.priceLimit != 0) {
            continue
          }
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
              <button style="cursor: pointer; background: #5c77ff; color: whitesmoke" id="confirm-trade-${userCoords.username}">
              ${userCoords.status == "SELLING" ? `Buy from ${userCoords.username}` : `Sell to ${userCoords.username}`}
              </button>
            </div>
          </div>
          `
          let marker = new Marker({
            color: '#5c77ff',
          })
            .setLngLat([userCoords.longitude, userCoords.latitude])
            .addTo(this.map)
          marker.getElement().addEventListener('click', (event) => {
            let popup = new Popup()
              .setLngLat([userCoords.longitude, userCoords.latitude])
              .setHTML(htmlContent)
            marker.setPopup(popup)
            let self = this;
            popup.on('open', function() {
              // @ts-ignore
              document.getElementById(`confirm-trade-${userCoords.username}`)
                .addEventListener('click', (e: Event) => {
                  self._confirmationService.confirm({
                    target: e.target as EventTarget,
                    message: 'Are you sure you want to trade?',
                    icon: 'pi pi-info-circle',
                    acceptIcon: 'none',
                    rejectIcon: 'none',
                    rejectButtonStyleClass: 'p-button-text',
                    accept: () => {

                    },
                    reject: () => {

                    }
                  })
                })
            })
          });
          marker.getElement().style.cursor = 'pointer';
          this.userMarkers.set(userCoords.userId, marker)
        }
      })


  }

  searchByUsername() {
    for (const user of this.otherUsersCoordinates) {
      let username = user.username;
      if (this.username == username) {
        this.map.flyTo({
          center: [user.longitude, user.latitude],
          zoom: 16
        });
      }
    }
  }

  confirmPopup(event: Event) {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to buy/sell?',
      icon: 'pi pi-exclamation-triangle'
    })
  }

  filterUsername(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.otherUsersCoordinates as any[]).length; i++) {
      let user = (this.otherUsersCoordinates as any[])[i];
      if (user.username.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user.username);
      }
    }
    this.filteredUsernames = filtered;
  }

  resetMapFilters() {
    this.filteringMap = false
    this.tempMapFilters = {
      'statusFilter': '',
      'priceLimit': 0,
      'energyLimit': 0
    }
    this.committedMapFilters = {
      'statusFilter': '',
      'priceLimit': 0,
      'energyLimit': 0
    }
    this.confirmFilters()
  }

  confirmFilters() {
    this.committedMapFilters = this.tempMapFilters;
    this.updateMarkers()
    this.filteringMap = !_.isEqual(this.committedMapFilters, this.initMapFilters);
    this.showDialog = false;
  }

  updateMarkers() {
    let statusComparison = this.committedMapFilters.statusFilter
    let priceComparison = this.committedMapFilters.priceLimit
    let energyComparison = this.committedMapFilters.energyLimit
    for (const user of this.otherUsersCoordinates) {
      const marker = this.userMarkers.get(user.userId)
      if (_.isEqual(this.committedMapFilters, this.initMapFilters)) {
        // @ts-ignore
        marker.getElement().style.display = "block";
      } else {
        if ((statusComparison.toLowerCase() == user.status.toLowerCase() || statusComparison.length == 0)
          && (priceComparison >= user.price || priceComparison == 0)
          && (energyComparison >= user.energy || energyComparison == 0)
        ) {
          // @ts-ignore
          marker.getElement().style.display = "block";
        } else {
          // @ts-ignore
          marker.getElement().style.display = "none";
        }
      }
    }
  }

}
