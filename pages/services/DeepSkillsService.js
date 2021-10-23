import { ethers } from 'ethers'
import { CeramicService } from './CeramicService'
import { deepSkillsModel } from '../models/index'
import { DeepSkillsContractService } from './DeepSkillsContractService'

const DEEPSKILLS_ALIAS = 'deepskills'

export class DeepSkillsService {
  constructor (ceramic, ethereum) {
    this._did = ceramic.did._id
    const provider = new ethers.providers.Web3Provider(ethereum)

    this._ceramicService = new CeramicService(ceramic)
    this._deepSkillsContractService = new DeepSkillsContractService(ethereum)
    this._signer = provider.getSigner()
  }

  async pullIssuersDids () {
    const issuerDids = []
    const lastIssuerIndex = await this._deepSkillsContractService.pullLastIssuerIndex()

    let index = 0
    if (lastIssuerIndex > 0) {
      while (index < lastIssuerIndex) {
        const issuer = await this._deepSkillsContractService.pullIssuerByIndex(index)
        console.log('issuer!!!', issuer)
        index++
        issuerDids.push(issuer)
      }

    }
    return issuerDids
  }

  async pullHolderDeepSkills(holderIdid) {
    let issuedDocuments = []
    const { publishedModel } = await this._ceramicService.buildDataModelStore(deepSkillsModel)

    const issuers = await this.pullIssuersDids()
    for (const issuerDid of issuers) {
      const result = await this._ceramicService.pullStoreDataForDID(publishedModel, issuerDid, DEEPSKILLS_ALIAS)
      const documents = result[DEEPSKILLS_ALIAS]
      issuedDocuments = issuedDocuments.concat(documents)
    }

    // TODO: ADD Filter
    return issuedDocuments
  }

  async issueAndStoreDocument (params) {
    const { publishedModel, dataStore } = await this._ceramicService.buildDataModelStore(deepSkillsModel)
    const allDocuments = await this._ceramicService.getStoreData(dataStore, DEEPSKILLS_ALIAS) || {}

    const documents = allDocuments[DEEPSKILLS_ALIAS] || []

    const deepSkillDocument = params
    deepSkillDocument.issuerDid = this._did

    const signature = await this._signer.signMessage(JSON.stringify(deepSkillDocument))
    deepSkillDocument.signature = signature

    documents.push(deepSkillDocument)

    const dataToStore = {}
    dataToStore[DEEPSKILLS_ALIAS] = documents
    console.log('BEFORE STORE!!!', dataToStore)
    await this._ceramicService.setStoreData(dataStore, dataToStore, DEEPSKILLS_ALIAS)
    console.log('AFTER STORE!!!')
  }

}