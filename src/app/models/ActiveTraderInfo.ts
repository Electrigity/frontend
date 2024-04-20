export class ActiveTraderInfo {
  private _EGYTokenBalance?: number
  private _buySellAmount?: number
  private _energyBalance?: number
  private _expiryDate?: Date
  private _latitude?: number
  private _longitude?: number
  private _price?: number
  private _tradingStatus?: string
  private _userAddress?: string
  private _username?: string


  get EGYTokenBalance(): number {
    return this._EGYTokenBalance!;
  }

  set EGYTokenBalance(value: number) {
    this._EGYTokenBalance = value;
  }

  get buySellAmount(): number {
    return this._buySellAmount!;
  }

  set buySellAmount(value: number) {
    this._buySellAmount = value;
  }

  get energyBalance(): number {
    return this._energyBalance!;
  }

  set energyBalance(value: number) {
    this._energyBalance = value;
  }

  get expiryDate(): Date {
    return this._expiryDate!;
  }

  set expiryDate(value: Date) {
    this._expiryDate = value;
  }

  get latitude(): number {
    return this._latitude!;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get longitude(): number {
    return this._longitude!;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  get price(): number {
    return this._price!;
  }

  set price(value: number) {
    this._price = value;
  }

  get tradingStatus(): string {
    return this._tradingStatus!;
  }

  set tradingStatus(value: string) {
    this._tradingStatus = value;
  }

  get userAddress(): string {
    return this._userAddress!;
  }

  set userAddress(value: string) {
    this._userAddress = value;
  }

  get username(): string {
    return this._username!;
  }

  set username(value: string) {
    this._username = value;
  }
}


