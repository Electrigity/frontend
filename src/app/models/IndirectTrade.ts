export class IndirectTrade {
  private _averagePrice?: number
  private _buyer?: string
  private _seller?: string
  private _energyAmount?: number
  private _timestamp?: Date


  get averagePrice(): number {
    return this._averagePrice!;
  }

  set averagePrice(value: number) {
    this._averagePrice = value;
  }

  get buyer(): string {
    return this._buyer!;
  }

  set buyer(value: string) {
    this._buyer = value;
  }

  get seller(): string {
    return this._seller!;
  }

  set seller(value: string) {
    this._seller = value;
  }

  get energyAmount(): number {
    return this._energyAmount!;
  }

  set energyAmount(value: number) {
    this._energyAmount = value;
  }

  get timestamp(): Date {
    return this._timestamp!;
  }

  set timestamp(value: Date) {
    this._timestamp = value;
  }
}
