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


  constructor( ) { }

  checkLocalStorage() {

  }

  async getCurrentUserId() {
    const accounts = (await window.ethereum?.request({
      method: "eth_requestAccounts",
    })) as string[];

    return accounts[0];
  }



}
