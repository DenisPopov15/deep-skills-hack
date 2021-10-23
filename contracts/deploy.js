require('dotenv').config()

const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const { MNEMONIC, INFURA_PROJECT_URL } = process.env
const initialMessage = 'Initial message'

const provider = new HDWalletProvider(
  MNEMONIC,
  INFURA_PROJECT_URL
)

// const options = {
//   transactionConfirmationBlocks: 1
// }
// const web3 = new Web3(provider, null, options)
const web3 = new Web3(provider)

const deploy = async() => {
  const accounts = await web3.eth.getAccounts()
  console.log('Trying deploy from', accounts[0])
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [initialMessage] })
    .send({ from: accounts[0], gas: '4000000', gasPrice: '100000000000' })

  console.log('result!!', result)

  provider.engine.stop()
}

deploy()
