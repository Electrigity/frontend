import {Component, ViewChild, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import maplibregl, {MapMouseEvent, Marker, NavigationControl, Popup} from 'maplibre-gl';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import * as _ from "lodash";
import {ConfirmationService} from "primeng/api";
import moment from 'moment';
import {ApiService} from "../../services/api.service";
import {UserInfo} from "../../models/UserInfo";
import {ActiveTraderInfo} from "../../models/ActiveTraderInfo";

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

  private userAddress!: string
  private userInfo!: UserInfo
  private activeTradersInfo!: ActiveTraderInfo[]

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

  constructor(private http: HttpClient,
              public confirmationService: ConfirmationService,
              private _apiService: ApiService) {
  }

  async ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl<object | null>(null)
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  async ngAfterViewInit() {
    const myAPIKey = '355084142fcc42eea656c31df0d782ac';
    const mapStyle = 'https://maps.geoapify.com/v1/styles/dark-matter-brown/style.json';

    this.userAddress = await this._apiService.getCurrentUserAddress()
    this.userInfo = await this._apiService.getUserInfo(this.userAddress)
    this.activeTradersInfo = await this._apiService.getActiveTraders()

    console.log(this.activeTradersInfo)
    const initialState = {
      // @ts-ignore
      lng: this.userInfo.longitude,
      // @ts-ignore
      lat: this.userInfo.latitude,
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
      .setLngLat([this.userInfo.longitude, this.userInfo.latitude])
      .addTo(this.map)

    for (const activeTrader of this.activeTradersInfo) {
      if (activeTrader.price > this.committedMapFilters.priceLimit && this.committedMapFilters.priceLimit != 0) {
        continue
      }
      const htmlContent = `
          <div style="width: 10rem; background-color: #383434">
            <p style="font-weight: bold; text-decoration: underline">${activeTrader.username}</p>
            <p>Current status:
                <span style="color: #5c77ff">${activeTrader.tradingStatus == "Buying" ? "Buying" : "Selling"}</span>
            </p>
            <p>Energy amount: ${activeTrader.energyBalance} kWh</p>
            <p>Transaction valid until: <span id="validDate"></span> </p>
            <p><span style="color: #04aa04">Price:</span>${activeTrader.price} EGY</p>
            <div style="display: flex; justify-content: center">
              <button style="cursor: pointer; background: #5c77ff; color: whitesmoke"
              id="confirm-trade-${activeTrader.username}">
              ${activeTrader.tradingStatus == "Selling" ? `Buy from ${activeTrader.username}` : `Sell to ${activeTrader.username}`}
              </button>
            </div>
          </div>
          `
      let marker = new Marker({
        color: '#5c77ff',
      })
        .setLngLat([activeTrader.longitude, activeTrader.latitude])
        .addTo(this.map)
      marker.getElement().addEventListener('click', (event) => {
        let popup = new Popup()
          .setLngLat([activeTrader.longitude, activeTrader.latitude])
          .setHTML(htmlContent)
        marker.setPopup(popup)
        let self = this;
        popup.on('open', function () {
          // @ts-ignore
          document.getElementById('validDate').innerHTML =
            moment(activeTrader.expiryDate).format("hh:mm A, DD MMM YYYY")
          // @ts-ignore
          document.getElementById(`confirm-trade-${activeTrader.username}`)
            .addEventListener('click', (e: Event) => {
              self.confirmationService.confirm({
                target: e.target as EventTarget,
                message: 'Are you sure you want to trade?',
                icon: 'pi pi-info-circle',
                acceptIcon: 'none',
                rejectIcon: 'none',
                rejectButtonStyleClass: 'p-button-text',
                accept: async () => {
                  const isBuying = activeTrader.tradingStatus == "Selling"
                  console.log(await self._apiService.initiateTransaction(
                    self.userAddress,
                    activeTrader.userAddress,
                    activeTrader.energyBalance,
                    activeTrader.price,
                    activeTrader.expiryDate,
                    isBuying
                  ))
                  if(isBuying) {
                    await self._apiService.approveTokens(activeTrader.price)
                  }
                },
                reject: () => {

                }
              })
            })
        })
      });
      marker.getElement().style.cursor = 'pointer';
      this.userMarkers.set(activeTrader.userAddress, marker)
    }


  }

  searchByUsername() {
    for (const user of this.activeTradersInfo) {
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
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to buy/sell?',
      icon: 'pi pi-exclamation-triangle'
    })
  }

  filterUsername(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.activeTradersInfo as any[]).length; i++) {
      let user = (this.activeTradersInfo as any[])[i];
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
    for (const user of this.activeTradersInfo) {
      const marker = this.userMarkers.get(user.userAddress)
      console.log(user.tradingStatus, user.price, user.energyBalance)
      if (_.isEqual(this.committedMapFilters, this.initMapFilters)) {
        // @ts-ignore
        marker.getElement().style.display = "block";
      } else {
        if ((statusComparison.toLowerCase() == user.tradingStatus.toLowerCase() || statusComparison.length == 0)
          && (priceComparison >= user.price || priceComparison == 0)
          && (energyComparison >= user.energyBalance || energyComparison == 0)
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
