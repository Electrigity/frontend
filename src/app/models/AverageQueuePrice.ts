export class AverageQueuePrice {
  private _averageBuyPrice?: number
  private _averageSellPrice?: number


  get averageBuyPrice(): number {
    return this._averageBuyPrice!;
  }

  set averageBuyPrice(value: number) {
    this._averageBuyPrice = value;
  }

  get averageSellPrice(): number {
    return this._averageSellPrice!;
  }

  set averageSellPrice(value: number) {
    this._averageSellPrice = value;
  }

}
