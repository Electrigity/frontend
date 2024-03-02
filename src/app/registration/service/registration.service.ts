import { Injectable } from '@angular/core';
import { MetaMaskInpageProvider } from "@metamask/providers";


declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

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

  constructor( ) { }

  checkLocalStorage() {

  }

  async getCurrentUserId() {
    const accounts = (await window.ethereum?.request({
      method: "eth_requestAccounts",
    })) as string[];

    return accounts[0];
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
