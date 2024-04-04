import {Injectable} from '@angular/core';
import {MetaMaskInpageProvider} from "@metamask/providers";
import { Web3 } from "web3";
import {ApiService} from "./api.service";
import {Router} from "@angular/router";
// for making HTTP requests

// declare global {
//   interface Window {
//     ethereum?: MetaMaskInpageProvider
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private userCoordinates = {
    longitude: -1,
    latitude: -1
  }
  private userId = '';
  private username = '';
  private web3: Web3;

  constructor(private _apiService: ApiService, private router: Router) {
    this.web3 = new Web3(window.ethereum)
  }

  async loginUser() {
    const userId = await this._apiService.getCurrentUserId()
    const isRegistered = await this._apiService.isUserRegistered(userId)
    if(!isRegistered) {
      alert('Your account is not registered!')
    }
    else {
      localStorage.setItem("currentUser", userId)
      this.setUserId(userId)
      this.router.navigate(['/home'])
    }
  }
  async isUniqueUsername(username: string): Promise<boolean> {
    const allUsernames: string[] = await this._apiService.getRegisteredUsernames()
    console.log(allUsernames)
    return !(allUsernames.indexOf(username) != -1);
  }

  async registerUser() {

  }

  async requestSignature() {
    const msgParams =
      {
        type: 'string',
        name: 'Authorization Request',
        value: this.web3.eth.defaultAccount
      }
    const perm = await window.ethereum?.request({
      method: 'wallet_getPermissions',
    })
    console.log(perm)
    // this.web3.currentProvider?.sendAsync({
    //   id: 1,
    //   method: 'personal_sign',
    //   params: msgParams,
    //   jsonrpc: "2.0"
    // }).then((result) => console.log(result))
  }

  setUserCoordinates(userCoordinates: {longitude: number, latitude: number}) {
    this.userCoordinates = userCoordinates;
  }
  getUserCoordinates() {
    return this.userCoordinates;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }
  getUserId() {
    return this.userId;
  }

  setUsername(username: string) {
    this.username = username;
  }
  getUsername() {
    return this.username;
  }

}
