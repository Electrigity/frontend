import {Injectable} from '@angular/core';
import {Web3} from "web3";
import {UserInfo} from "../models/UserInfo";
import {MetaMaskInpageProvider} from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  contractAddress = '0x78dE82ADd10A52f3499c3363356817Fc1B8B823f'
  contractAbi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_transactionId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "_accepted",
          "type": "bool"
        }
      ],
      "name": "commitTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "deleteUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_energyAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_validUntil",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isBuyTransaction",
          "type": "bool"
        }
      ],
      "name": "initiateTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_username",
          "type": "string"
        },
        {
          "internalType": "int256",
          "name": "_latitude",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "_longitude",
          "type": "int256"
        },
        {
          "internalType": "uint256",
          "name": "_energyBalance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_tokensBalance",
          "type": "uint256"
        }
      ],
      "name": "registerUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "transactionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "accepted",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "status",
          "type": "string"
        }
      ],
      "name": "TransactionCommitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "transactionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum EnergyTradingPlatform.TransactionType",
          "name": "transactionType",
          "type": "uint8"
        }
      ],
      "name": "TransactionInitiated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_newEnergyBalance",
          "type": "uint256"
        }
      ],
      "name": "updateEnergyBalance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_username",
          "type": "string"
        },
        {
          "internalType": "int256",
          "name": "_latitude",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "_longitude",
          "type": "int256"
        },
        {
          "internalType": "uint256",
          "name": "_energyBalance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_tokensBalance",
          "type": "uint256"
        }
      ],
      "name": "updateUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "UserDeleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "int256",
          "name": "latitude",
          "type": "int256"
        },
        {
          "indexed": false,
          "internalType": "int256",
          "name": "longitude",
          "type": "int256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "energyBalance",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokensBalance",
          "type": "uint256"
        }
      ],
      "name": "UserRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "int256",
          "name": "latitude",
          "type": "int256"
        },
        {
          "indexed": false,
          "internalType": "int256",
          "name": "longitude",
          "type": "int256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "energyBalance",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokensBalance",
          "type": "uint256"
        }
      ],
      "name": "UserUpdated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllCommittedTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "initiator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "energyAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "validUntil",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "committed",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "enum EnergyTradingPlatform.TransactionType",
              "name": "transactionType",
              "type": "uint8"
            }
          ],
          "internalType": "struct EnergyTradingPlatform.Transaction[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllPendingTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "initiator",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "energyAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "validUntil",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "committed",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "enum EnergyTradingPlatform.TransactionType",
              "name": "transactionType",
              "type": "uint8"
            }
          ],
          "internalType": "struct EnergyTradingPlatform.Transaction[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllUsersInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "username",
              "type": "string"
            },
            {
              "internalType": "int256",
              "name": "latitude",
              "type": "int256"
            },
            {
              "internalType": "int256",
              "name": "longitude",
              "type": "int256"
            },
            {
              "internalType": "uint256",
              "name": "energyBalance",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "tokensBalance",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isRegistered",
              "type": "bool"
            }
          ],
          "internalType": "struct EnergyTradingPlatform.UserInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNumberOfNotCommittedTransactions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserAddresses",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "getUserInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "username",
              "type": "string"
            },
            {
              "internalType": "int256",
              "name": "latitude",
              "type": "int256"
            },
            {
              "internalType": "int256",
              "name": "longitude",
              "type": "int256"
            },
            {
              "internalType": "uint256",
              "name": "energyBalance",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "tokensBalance",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isRegistered",
              "type": "bool"
            }
          ],
          "internalType": "struct EnergyTradingPlatform.UserInfo",
          "name": "userInfo",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "isUserRegistered",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "pendingTransactions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "transactions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "initiator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "energyAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "validUntil",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "committed",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "status",
          "type": "string"
        },
        {
          "internalType": "enum EnergyTradingPlatform.TransactionType",
          "name": "transactionType",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "users",
      "outputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "internalType": "int256",
          "name": "latitude",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "longitude",
          "type": "int256"
        },
        {
          "internalType": "uint256",
          "name": "energyBalance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tokensBalance",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  web3
  contract
  constructor() {
    this.web3 = new Web3(window.ethereum)
    this.contract = new this.web3.eth.Contract(this.contractAbi, this.contractAddress)
  }

  async getCurrentUserId() {
    const accounts = (await window.ethereum?.request({
      method: "eth_requestAccounts",
    })) as string[];
    return accounts[0];
  }

  async isUserRegistered(address: string): Promise<boolean> {
    console.log(this.contract)
    return await this.contract.methods['isUserRegistered'](address).call()
  }

  async getRegisteredUsernames(): Promise<string[]> {
    const allUsersInfo: UserInfo[] = await this.contract.methods['getAllUsersInfo']().call()
    return allUsersInfo.map(value => value.username)
  }

  async registerUser(username: string) {
    const userId = await this.getCurrentUserId()
    const response = await this.contract.methods['registerUser'](
      'karimkishly',
      12,
      13,
      14,
      15,
    ).send({from: userId})
    console.log(response)
    console.log(await this.contract.methods['getAllUsersInfo']().call())
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    return await this.contract.methods['getUserInfo'](userId).call() as UserInfo
  }


  async testApi() {
    let accs = await this.web3.eth.getAccounts()
    console.log(accs)
    console.log(this.web3.eth.defaultAccount)
    console.log(this.contract)
    //@ts-ignore
    let response = await this.contract.methods.getAllCommittedTransactions().call();
    console.log(response)
  }


}
