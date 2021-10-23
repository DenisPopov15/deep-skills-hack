import Web3 from 'web3'

import { SMART_CONTRACT_ADDRESS } from '../config/index'

const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "lastIssuerIndex",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "returnIssuer",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "manager",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "issuersMap",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_issuer",
        "type": "string"
      }
    ],
    "name": "addIssuer",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }
]

export class DeepSkillsContractService {
  constructor (ethereum) {
    const web3 = new Web3(ethereum)
    this._deepSkills = new web3.eth.Contract(abi, SMART_CONTRACT_ADDRESS)
  }

  async pullLastIssuerIndex () {
    const lastIssuerIndex = await this._deepSkills.methods.lastIssuerIndex().call()

    return lastIssuerIndex
  }

  async pullIssuerByIndex (index) {
    const issuerDid = await this._deepSkills.methods.returnIssuer(index).call()

    return issuerDid
  }
}
