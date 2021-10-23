import { CeramicService } from './CeramicService'
import { deepSkillsModel } from '../models/index'
const DEEPSKILLS_ALIAS = 'notes'

export class DeepSkillsService {
  constructor (ceramic) {
    this._ceramicService = new CeramicService(ceramic)
  }

  async pullIssuersDids () {
    return ['did:3:kjzl6cwe1jw1497oabwxdz3jyrlmdi7p6l9r1a4vgfzcf6ygxls08h7ryjx1vjy']
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

  async issueAndStoreDocument (signer, params) {
    const { publishedModel, dataStore } = await this._ceramicService.buildDataModelStore(deepSkillsModel)
    const allDocuments = await this._ceramicService.getStoreData(dataStore, DEEPSKILLS_ALIAS)

    const documents = allDocuments[DEEPSKILLS_ALIAS] || []

    const deepSkillDocument = params
    const message = JSON.stringify(params)
    const signature = await signer.signMessage(message)
    console.log('signature!!!!', signature)

    // deepSkillDocument.signature = 'SomeSignature'
    // deepSkillDocument.issuerDid = 'SomeIssuerDid'

    documents.push(deepSkillDocument)

    const dataToStore = {}
    dataToStore[DEEPSKILLS_ALIAS] = documents
    await this._ceramicService.setStoreData(dataStore, dataToStore, DEEPSKILLS_ALIAS)
  }

}