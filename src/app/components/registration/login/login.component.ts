import { Component } from '@angular/core';
import { RegistrationService } from "../../../services/registration.service";
import { Router } from "@angular/router";
import {MetaMaskInpageProvider} from "@metamask/providers";
import {Web3} from "web3";

interface ContractMethods {
  getAllUsersInfo(): Function
}


// declare global {
//   interface Window {
//     ethereum?: MetaMaskInpageProvider
//   }
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private contractABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_userAddress",
          type: "address",
        },
      ],
      name: "deleteUser",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_username",
          type: "string",
        },
        {
          internalType: "int256",
          name: "_latitude",
          type: "int256",
        },
        {
          internalType: "int256",
          name: "_longitude",
          type: "int256",
        },
        {
          internalType: "uint256",
          name: "_energyBalance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_tokensBalance",
          type: "uint256",
        },
      ],
      name: "registerUser",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_username",
          type: "string",
        },
        {
          internalType: "int256",
          name: "_latitude",
          type: "int256",
        },
        {
          internalType: "int256",
          name: "_longitude",
          type: "int256",
        },
        {
          internalType: "uint256",
          name: "_energyBalance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_tokensBalance",
          type: "uint256",
        },
      ],
      name: "updateUser",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
      ],
      name: "UserDeleted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "username",
          type: "string",
        },
        {
          indexed: false,
          internalType: "int256",
          name: "latitude",
          type: "int256",
        },
        {
          indexed: false,
          internalType: "int256",
          name: "longitude",
          type: "int256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "energyBalance",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokensBalance",
          type: "uint256",
        },
      ],
      name: "UserRegistered",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "userAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "username",
          type: "string",
        },
        {
          indexed: false,
          internalType: "int256",
          name: "latitude",
          type: "int256",
        },
        {
          indexed: false,
          internalType: "int256",
          name: "longitude",
          type: "int256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "energyBalance",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokensBalance",
          type: "uint256",
        },
      ],
      name: "UserUpdated",
      type: "event",
    },
    {
      inputs: [],
      name: "admin",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllUsersInfo",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
            {
              internalType: "int256",
              name: "latitude",
              type: "int256",
            },
            {
              internalType: "int256",
              name: "longitude",
              type: "int256",
            },
            {
              internalType: "uint256",
              name: "energyBalance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "tokensBalance",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isRegistered",
              type: "bool",
            },
          ],
          internalType: "struct Main.UserInfo[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getUserAddresses",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_userAddress",
          type: "address",
        },
      ],
      name: "getUserInfo",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "username",
              type: "string",
            },
            {
              internalType: "int256",
              name: "latitude",
              type: "int256",
            },
            {
              internalType: "int256",
              name: "longitude",
              type: "int256",
            },
            {
              internalType: "uint256",
              name: "energyBalance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "tokensBalance",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isRegistered",
              type: "bool",
            },
          ],
          internalType: "struct Main.UserInfo",
          name: "userInfo",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_userAddress",
          type: "address",
        },
      ],
      name: "isUserRegistered",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "users",
      outputs: [
        {
          internalType: "string",
          name: "username",
          type: "string",
        },
        {
          internalType: "int256",
          name: "latitude",
          type: "int256",
        },
        {
          internalType: "int256",
          name: "longitude",
          type: "int256",
        },
        {
          internalType: "uint256",
          name: "energyBalance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "tokensBalance",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isRegistered",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  private contractABI2 = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "allowance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC20InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC20InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSpender",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  private contractAddress = "0x336F665bBF289FC8Ba746a0Cb5900EF2f9CD3828";
  private contractAddress2 = "0xfe847dDEe78954808977aBf11C1368317fb1Dc10";


constructor(private _registrationService: RegistrationService, private router: Router) {}

  ngOnInit() {
    const userId = localStorage.getItem("currentUser")

    if(userId != null) {
      this._registrationService.setUserId(userId)
      this.router.navigate(['/home'])
    }
  }

  async onClickLogin() {
    // const userId = await this._registrationService.getCurrentUserId()
    // localStorage.setItem("currentUser", userId)
    //
    // if(localStorage.getItem("currentUser") != null) {
    //   this._registrationService.setUserId(userId)
    //   this.router.navigate(['/home'])
    // }
    this._registrationService.loginUser()
  }

  onClickSignup() {
    this.router.navigate(['/signup']);
  }
}
