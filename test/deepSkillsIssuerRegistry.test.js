const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const { interface, bytecode } = require('../contracts/compile')

const web3 = new Web3(ganache.provider())

let deepSkillsRegistry
let accounts
before(async() => {
  accounts = await web3.eth.getAccounts()

  deepSkillsRegistry = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('DeepSkillsIssuerRegistry', async() => {
  it('deploys a contract', () => {
    assert.ok(deepSkillsRegistry.options.address)
  })

  it('#manager', async() => {
    const manager = await deepSkillsRegistry.methods.manager().call()
    assert.equal(manager, accounts[0])
  })

  it('#lastIssuerIndex', async() => {
    const lastIssuerIndex = await deepSkillsRegistry.methods.lastIssuerIndex().call()
    assert.equal(lastIssuerIndex, 0)
  })

  it('#addIssuer', async() => {
    const issuerDid = 'did:3:kjzl6cwe1jw1497oabwxdz3jyrlmdi7p6l9r1a4vgfzcf6ygxls08h7ryjx1vjy'
    const secondIssuerDid = 'did:3:kjzl6cwe1jw149w9qf3diageaj304f8v23lxwbf8waditvwfbtfyg885740n89o'
    const lastIssuerIndexInitial = await deepSkillsRegistry.methods.lastIssuerIndex().call()
    assert.equal(lastIssuerIndexInitial, 0)

    await deepSkillsRegistry.methods.addIssuer(issuerDid).send({
      from: accounts[0],
      gas: '1000000',
    })

    const lastIssuerIndex = await deepSkillsRegistry.methods.lastIssuerIndex().call()
    assert.equal(lastIssuerIndex, 1)

    const issuer = await deepSkillsRegistry.methods.returnIssuer(0).call()
    assert.equal(issuer, issuerDid)
    const notExistsIssuer = await deepSkillsRegistry.methods.returnIssuer(1).call()
    assert.equal(notExistsIssuer, '')

    await deepSkillsRegistry.methods.addIssuer(secondIssuerDid).send({
      from: accounts[0],
      gas: '1000000',
    })

    const lastIssuerIndexFinal = await deepSkillsRegistry.methods.lastIssuerIndex().call()
    assert.equal(lastIssuerIndexFinal, 2)

    const issuerFinal = await deepSkillsRegistry.methods.returnIssuer(1).call()
    assert.equal(issuerFinal, secondIssuerDid)
  })

})