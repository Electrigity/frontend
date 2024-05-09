export class PendingTransaction {
  private _committed?: boolean
  private _energyAmount?: number
  private _id?: number
  private _initialDate?: Date
  private _initiator?: string
  private _price?: number
  private _receiver?: string
  private _status?: string
  private _isBuying?: boolean
  private _validUntil?: Date
  private _initiatorUsername?: string


  get initiatorUsername(): string {
    return this._initiatorUsername!;
  }

  set initiatorUsername(value: string) {
    this._initiatorUsername = value;
  }

  get committed(): boolean {
    return this._committed!;
  }

  set committed(value: boolean) {
    this._committed = value;
  }

  get energyAmount(): number {
    return this._energyAmount!;
  }

  set energyAmount(value: number) {
    this._energyAmount = value;
  }

  get id(): number {
    return this._id!;
  }

  set id(value: number) {
    this._id = value;
  }

  get initialDate(): Date {
    return this._initialDate!;
  }

  set initialDate(value: Date) {
    this._initialDate = value;
  }

  get initiator(): string {
    return this._initiator!;
  }

  set initiator(value: string) {
    this._initiator = value;
  }

  get price(): number {
    return this._price!;
  }

  set price(value: number) {
    this._price = value;
  }

  get receiver(): string {
    return this._receiver!;
  }

  set receiver(value: string) {
    this._receiver = value;
  }

  get status(): string {
    return this._status!;
  }

  set status(value: string) {
    this._status = value;
  }

  get isBuying(): boolean {
    return this._isBuying!;
  }

  set isBuying(value: boolean) {
    this._isBuying = value;
  }

  get validUntil(): Date {
    return this._validUntil!;
  }

  set validUntil(value: Date) {
    this._validUntil = value;
  }
}
