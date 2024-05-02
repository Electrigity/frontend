export class CommittedTransaction {
  private _id?: number
  private _committed?: boolean
  private _energyAmount?: number
  private _initialDate?: Date
  private _initiator?: string
  private _price?: number
  private _receiver?: string
  private _status?: string
  private _transactionType?: string
  private _validUntil?: Date
  private _role?: string
  private _otherUser?: string


  get id(): number {
    return this._id!;
  }

  set id(value: number) {
    this._id = value;
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

  get transactionType(): string {
    return this._transactionType!;
  }

  set transactionType(value: string) {
    this._transactionType = value;
  }

  get validUntil(): Date {
    return this._validUntil!;
  }

  set validUntil(value: Date) {
    this._validUntil = value;
  }

  get role(): string {
    return this._role!;
  }

  set role(value: string) {
    this._role = value;
  }

  get otherUser(): string {
    return this._otherUser!;
  }

  set otherUser(value: string) {
    this._otherUser = value;
  }
}
