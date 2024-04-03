export class RegisteringUser {
  private _userId?: string
  private _username?: string
  private _longitude?: number
  private _latitude?: number

  get userId(): string {
    return this._userId!;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get username(): string {
    return this._username!;
  }

  set username(value: string) {
    this._username = value;
  }

  get longitude(): number {
    return this._longitude!;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  get latitude(): number {
    return this._latitude!;
  }

  set latitude(value: number) {
    this._latitude = value;
  }
}
