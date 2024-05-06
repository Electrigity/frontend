import {Injectable} from '@angular/core';
import {Web3} from "web3";
import {UserInfo} from "../models/UserInfo";
import {MetaMaskInpageProvider} from "@metamask/providers";
import {UserTradingInfo} from "../models/UserTradingInfo";
import {ActiveTraderInfo} from "../models/ActiveTraderInfo";
import {PendingTransaction} from "../models/PendingTransaction";
import {CommittedTransaction} from "../models/CommittedTransaction";
import {QueueUsers} from "../models/QueueUsers";
import {AverageQueuePrice} from "../models/AverageQueuePrice";
import {IndirectTrade} from "../models/IndirectTrade";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  userManagerContractAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
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
          "name": "tradingStatus",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "expiryDate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "buySellAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "TradingInfoUpdated",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approveTokens",
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
      "inputs": [],
      "name": "getAllUsersInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "userAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "username",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "EGYTokenBalance",
              "type": "uint256"
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
              "internalType": "bool",
              "name": "isRegistered",
              "type": "bool"
            }
          ],
          "internalType": "struct UserManager.UserInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getEnergyBalance",
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
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getTokenBalance",
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
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getTradingInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "userAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "tradingStatus",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "buySellAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "expiryDate",
              "type": "uint256"
            }
          ],
          "internalType": "struct UserManager.TradingInfo",
          "name": "",
          "type": "tuple"
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
              "internalType": "address",
              "name": "userAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "username",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "EGYTokenBalance",
              "type": "uint256"
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
              "internalType": "bool",
              "name": "isRegistered",
              "type": "bool"
            }
          ],
          "internalType": "struct UserManager.UserInfo",
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
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getUserInfoAll",
      "outputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "EGYTokenBalance",
          "type": "uint256"
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
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getUserTokenBalance",
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
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "initializeTradingInfo",
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
        }
      ],
      "name": "registerUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "resetTradingInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "contract MyERC20",
          "name": "",
          "type": "address"
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
      "name": "tradingInfos",
      "outputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "tradingStatus",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "buySellAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "expiryDate",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "increase",
          "type": "bool"
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
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "increase",
          "type": "bool"
        }
      ],
      "name": "updateTokenBalance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_tradingStatus",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_expiryDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_buySellAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "updateTradingUserInfo",
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
        }
      ],
      "name": "updateUser",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "EGYTokenBalance",
          "type": "uint256"
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
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  userManagerContractAddress = '0x3Ae7EA6114Aae052238eFce6881dE7872BD70365'
  energyTransactionContractAbi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approveTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
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
          "internalType": "address",
          "name": "userManagerAddress",
          "type": "address"
        }
      ],
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
          "internalType": "enum EnergyTransactionManager.TransactionType",
          "name": "transactionType",
          "type": "uint8"
        }
      ],
      "name": "TransactionInitiated",
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
      "name": "getActiveTraders",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "userAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "username",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "EGYTokenBalance",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "energyBalance",
              "type": "uint256"
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
              "internalType": "string",
              "name": "tradingStatus",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "buySellAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "expiryDate",
              "type": "uint256"
            }
          ],
          "internalType": "struct EnergyTransactionManager.CombinedUserInfo[]",
          "name": "",
          "type": "tuple[]"
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
              "internalType": "uint256",
              "name": "initialDate",
              "type": "uint256"
            },
            {
              "internalType": "enum EnergyTransactionManager.TransactionType",
              "name": "transactionType",
              "type": "uint8"
            }
          ],
          "internalType": "struct EnergyTransactionManager.Transaction[]",
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
              "internalType": "uint256",
              "name": "initialDate",
              "type": "uint256"
            },
            {
              "internalType": "enum EnergyTransactionManager.TransactionType",
              "name": "transactionType",
              "type": "uint8"
            }
          ],
          "internalType": "struct EnergyTransactionManager.Transaction[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getAllUserTransactions",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getNotCommittedTransactionsCount",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getUserCommittedTransactions",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getUserPendingTransactions",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getUserTokenBalance",
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
          "internalType": "uint256",
          "name": "initialDate",
          "type": "uint256"
        },
        {
          "internalType": "enum EnergyTransactionManager.TransactionType",
          "name": "transactionType",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "userManager",
      "outputs": [
        {
          "internalType": "contract UserManager",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  energyTransactionContractAddress = '0x3DD6720261c3d8Ee59a05D3dFa641f31fF930586'
  tokenContractAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSpender",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
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
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
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
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
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
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
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
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  tokenContractAddress = '0x90a50629e886d535576013BA2f7E735Dc4781d8C'
  indirectTradingContractAddress = '0x3eF204450C8962117Bdf51041DFF907355c82b0a'
  indirectTradingContractAbi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        }
      ],
      "name": "cancelOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "matchOrders",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userManagerAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "OrderCancelled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "energyAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isBuyOrder",
          "type": "bool"
        }
      ],
      "name": "OrderPlaced",
      "type": "event"
    },
    {
      "inputs": [
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
          "internalType": "bool",
          "name": "_isBuyOrder",
          "type": "bool"
        }
      ],
      "name": "placeOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tradeId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "averagePrice",
          "type": "uint256"
        }
      ],
      "name": "TradeMatched",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "averageOrderPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "averageBuyPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "averageSellPrice",
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
      "name": "buyOrderIds",
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
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getTradeHistoryForAddress",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "averagePrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "energyAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct IndirectEnergyTrading.Trade[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nextOrderId",
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
      "name": "nextTradeId",
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
      "name": "numberOfUsers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "numberOfBuyers",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "numberOfSellers",
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
      "name": "orders",
      "outputs": [
        {
          "internalType": "address",
          "name": "user",
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
          "internalType": "bool",
          "name": "isBuyOrder",
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
      "name": "sellOrderIds",
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
      "name": "tradeHistory",
      "outputs": [
        {
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "averagePrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "energyAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  web3
  userManagerContract
  energyTransactionContract
  indirectTradingContract
  tokenContract

  constructor() {
    this.web3 = new Web3(window.ethereum)
    this.userManagerContract = new this.web3.eth.Contract(
      this.userManagerContractAbi, this.userManagerContractAddress
    )
    this.energyTransactionContract = new this.web3.eth.Contract(
      this.energyTransactionContractAbi, this.energyTransactionContractAddress
    )
    this.indirectTradingContract = new this.web3.eth.Contract(
      this.indirectTradingContractAbi, this.indirectTradingContractAddress
    )
    this.tokenContract = new this.web3.eth.Contract(
      this.tokenContractAbi, this.tokenContractAddress
    )

  }

  async getCurrentUserAddress() {
    const accounts = (await window.ethereum?.request({
      method: "eth_requestAccounts",
    })) as string[];
    return accounts[0];
  }

  async isUserRegistered(address: string): Promise<boolean> {
    return await this.userManagerContract.methods['isUserRegistered'](address).call()
  }

  async getRegisteredUsernames(): Promise<string[]> {
    const allUsersInfo: UserInfo[] = await this.userManagerContract.methods['getAllUsersInfo']().call()
    return allUsersInfo.map(value => value.username)
  }

  async registerUser(
    username: string,
    latitude: number,
    longitude: number,
    energyBalance: number,
  ) {
    const utils = this.web3.utils
    const userAddress = await this.getCurrentUserAddress()
    return await this.userManagerContract.methods['registerUser'](
      username,
      BigInt(utils.toWei(latitude, 'ether')),
      BigInt(utils.toWei(longitude, 'ether')),
      energyBalance
    ).send({from: userAddress})
  }

  async getUserInfo(userAddress: string): Promise<UserInfo> {
    let userInfo = await this.userManagerContract.methods['getUserInfo'](userAddress).call() as UserInfo
    const utils = this.web3.utils
    userInfo.longitude = Number(utils.fromWei(userInfo.longitude, 'ether'))
    userInfo.latitude = Number(utils.fromWei(userInfo.latitude, 'ether'))
    return userInfo
  }

  async getTradingInfo(userAddress: string): Promise<UserTradingInfo> {
    let userTradingInfo = await this.userManagerContract.methods['getTradingInfo'](userAddress).call() as UserTradingInfo
    userTradingInfo.expiryDate = userTradingInfo.expiryDate * BigInt(1000)
    return userTradingInfo
  }

  async updateTradingInfo(
    tradingStatus: string,
    expiryDate: number,
    buySellAmount: number,
    price: number
  ) {
    console.log(this.userManagerContract)
    const userAddress = await this.getCurrentUserAddress()
    return await this.userManagerContract.methods['updateTradingUserInfo'](
      tradingStatus,
      BigInt(expiryDate/1000),
      BigInt(buySellAmount),
      BigInt(price),
    ).send({from: userAddress})
  }

  async updateTradingInfoToNotTrading() {
    const userAddress = await this.getCurrentUserAddress()
    return await this.userManagerContract.methods['updateTradingUserInfo'](
      'NotTrading',
      BigInt(0),
      BigInt(0),
      BigInt(0)
    ).send({from: userAddress})
  }

  async updateUser(
    username: string,
    latitude: number,
    longitude: number,
    balance: number,
    type: 'username' | 'location'
  ) {
    const userAddress = await this.getCurrentUserAddress()
    const utils = this.web3.utils
    if (type == 'username') {
      return await this.userManagerContract.methods['updateUser'](
        username,
        BigInt(utils.toWei(latitude, 'ether')),
        BigInt(utils.toWei(longitude, 'ether')),
        BigInt(balance),
      ).send({from: userAddress})
    } else {
      return await this.userManagerContract.methods['updateUser'](
        username,
        BigInt(utils.toWei(latitude, 'ether')),
        BigInt(utils.toWei(longitude, 'ether')),
        BigInt(balance),
      ).send({from: userAddress})
    }
  }

  async deleteUser() {
    const userAddress = await this.getCurrentUserAddress()
    return await this.userManagerContract.methods['deleteUser'](
      userAddress).send({from: userAddress})
  }

  async getActiveTraders() {
    const userAddress = await this.getCurrentUserAddress()
    let activeTraders: any[] = await this.energyTransactionContract.methods['getActiveTraders']().call()
    const utils = this.web3.utils
    activeTraders = activeTraders.filter(trader => trader.userAddress.toLowerCase() != userAddress)
    return activeTraders.map(trader => {
      let activeTraderInfo = new ActiveTraderInfo()
      activeTraderInfo.EGYTokenBalance = Number(utils.fromWei(trader['EGYTokenBalance'], 'ether'))
      activeTraderInfo.latitude = Number(utils.fromWei(trader['latitude'], 'ether'))
      activeTraderInfo.longitude = Number(utils.fromWei(trader['longitude'], 'ether'))
      activeTraderInfo.username = trader['username']
      activeTraderInfo.price = Number(trader['price'])
      activeTraderInfo.energyBalance = Number(trader['buySellAmount'])
      activeTraderInfo.tradingStatus = trader['tradingStatus']
      activeTraderInfo.userAddress = trader['userAddress']
      activeTraderInfo.expiryDate = new Date(Number(trader['expiryDate']) * 1000)
      return activeTraderInfo
    })

  }

  async initiateTransaction(
    senderAddress: string,
    receiverAddress: string,
    energyAmount: number,
    price: number,
    validUntil: Date,
    isBuyTransaction: boolean
  ) {
    return this.energyTransactionContract.methods['initiateTransaction'](
      senderAddress,
      receiverAddress,
      energyAmount,
      BigInt(this.web3.utils.toWei(price, 'ether')),
      Number(validUntil),
      isBuyTransaction
    ).send({from: senderAddress})
  }

  async getUserPendingTransactions() {
    const userAddress = await this.getCurrentUserAddress()
    let transactionIds: any[] = await this.energyTransactionContract
      .methods['getUserPendingTransactions'](userAddress).call()
    transactionIds = transactionIds.map(transactionId => Number(transactionId))

    let allTransactions: any[] = await this.getAllPendingTransactions()
    let myTransactions = await Promise.all(allTransactions.map(async transaction => {
      let myTransaction = new PendingTransaction()
      myTransaction.committed = transaction.committed
      myTransaction.energyAmount = Number(transaction.energyAmount)
      myTransaction.id = Number(transaction.id)
      myTransaction.initialDate = new Date(Number(transaction.initialDate) * 1000)
      myTransaction.initiator = transaction.initiator.toLowerCase()
      myTransaction.price = Number(this.web3.utils.fromWei(Number(transaction.price), 'ether'))
      myTransaction.receiver = transaction.receiver
      myTransaction.status = transaction.status
      myTransaction.isBuying = (Number(transaction.transactionType) == 0)
      myTransaction.validUntil = new Date(Number(transaction.validUntil))
      const userInfo = await this.getUserInfo(myTransaction.initiator)
      myTransaction.initiatorUsername = userInfo.username
      return myTransaction
    }))

    myTransactions = myTransactions.filter(transaction => {
      return (transactionIds.includes(transaction.id)) && (userAddress != transaction.initiator)
    })

    myTransactions.sort((a, b) =>
    {return a.initialDate > b.initialDate ? -1 : 0}
    )
    return myTransactions
  }

  async getAllPendingTransactions() {
    return this.energyTransactionContract.methods['getAllPendingTransactions']().call() as Promise<any[]>
  }

  async getNotCommittedTransactionsCount() {
    const userAddress = await this.getCurrentUserAddress()
    return this.energyTransactionContract.methods['getNotCommittedTransactionsCount'](userAddress)
      .call() as Promise<number>
  }

  async commitTransaction(transactionId: number, accepted: boolean) {
    const userAddress = await this.getCurrentUserAddress()
    return this.energyTransactionContract.methods['commitTransaction'](transactionId, accepted)
      .send({ from: userAddress })
  }

  async getCommittedTransactions() {
    const userAddress = await this.getCurrentUserAddress()
    let committedTransactionsIds: number[] = await this.energyTransactionContract
      .methods['getUserCommittedTransactions'](userAddress).call()
    committedTransactionsIds = committedTransactionsIds.map(id => Number(id))
    const initialTransactions: any[] = await this.energyTransactionContract
      .methods['getAllCommittedTransactions']().call()
    let committedTransactions = await Promise.all(initialTransactions.map(async transaction => {
      let committedTransaction = new CommittedTransaction()
      committedTransaction.id = Number(transaction.id)
      committedTransaction.energyAmount = Number(transaction.energyAmount)
      committedTransaction.committed = transaction.committed
      committedTransaction.initialDate = new Date(Number(transaction.initialDate) * 1000)
      committedTransaction.initiator = transaction.initiator.toLowerCase()
      committedTransaction.price = Number(this.web3.utils.fromWei(transaction.price, 'ether'))
      committedTransaction.receiver = transaction.receiver.toLowerCase()
      committedTransaction.status = transaction.status
      committedTransaction.transactionType = Number(transaction.transactionType) == 0 ? 'Buy' : 'Sell'

      const otherUserAddress = (userAddress == committedTransaction.initiator) ?
        committedTransaction.receiver : committedTransaction.initiator

      const userInfo = await this.getUserInfo(otherUserAddress)
      committedTransaction.otherUser = userInfo.username


      if( (userAddress == committedTransaction.initiator && committedTransaction.transactionType == 'Buy')
        || (userAddress == committedTransaction.receiver && committedTransaction.transactionType == 'Sell')
      ) {
        committedTransaction.role = 'Consumer'
      }
      else {
        committedTransaction.role = 'Producer'
      }

      return committedTransaction
    }))
    committedTransactions = committedTransactions.filter(transaction => {
      return (committedTransactionsIds.includes(transaction.id))
    })
    committedTransactions = committedTransactions.sort((a, b) =>
      {return a.initialDate > b.initialDate ? -1 : 0}
    )
    return committedTransactions
  }

  async placeIndirectOrder(energyAmount: number, price: number, isBuyOrder: boolean) {
    const userAddress = await this.getCurrentUserAddress()
    if(isBuyOrder) {await this.approveTokens(price*1.5)}
    await this.indirectTradingContract.methods['placeOrder'](
      energyAmount,
      BigInt(this.web3.utils.toWei(price, 'ether')),
      isBuyOrder)
      .send({ from : userAddress})
  }

  async matchOrders() {
    const userAddress = await this.getCurrentUserAddress()
    return await this.indirectTradingContract.methods['matchOrders']().send({ from : userAddress})
  }

  async getIndirectTradeHistory() {
    const userAddress = await this.getCurrentUserAddress()
    let tradeHistory: any[] = await this.indirectTradingContract.methods['getTradeHistoryForAddress'](
      userAddress.toLowerCase()
    ).call()
    const indirectTrades: IndirectTrade[] = await Promise.all(tradeHistory.map(async trade => {
      let indirectTrade: IndirectTrade = new IndirectTrade()
      indirectTrade.energyAmount = Number(trade['energyAmount'])
      indirectTrade.buyer = (await this.getUserInfo(trade['buyer'])).username
      indirectTrade.seller = (await this.getUserInfo(trade['seller'])).username
      indirectTrade.averagePrice = Number(this.web3.utils.fromWei(trade['averagePrice'], 'ether'))
      indirectTrade.timestamp = new Date(Number(trade['timestamp']) * 1000)
      return indirectTrade
    }))
    return indirectTrades
  }

  async numberOfBuyersAndSellersInQueue() {
    const numberOfUsers: QueueUsers = await this.indirectTradingContract.methods['numberOfUsers']().call()
    return numberOfUsers
  }

  async averagePriceInQueue() {
    const avg: any = await this.indirectTradingContract.methods['averageOrderPrice']().call()
    let toReturn = new AverageQueuePrice()
    toReturn.averageBuyPrice = Number(this.web3.utils.fromWei(avg['averageBuyPrice'], 'ether'))
    toReturn.averageSellPrice = Number(this.web3.utils.fromWei(avg['averageSellPrice'], 'ether'))
    return toReturn
  }

  async getTokenBalance(userAddress: string) {
    const info = await this.userManagerContract.methods['getTokenBalance'](userAddress).call()
    console.log(info)
  }

  async approveTokens(tokens: number) {
    const userAddress = await this.getCurrentUserAddress()
    return await this.tokenContract
      .methods['approve'](this.userManagerContractAddress, BigInt(this.web3.utils.toWei(tokens, 'ether')))
      .send({ from: userAddress })
  }


}
