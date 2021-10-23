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
    const issuedDocuments = []
    const { publishedModel } = await this._ceramicService.buildDataModelStore(deepSkillsModel)

    const issuers = await this.pullIssuersDids()
    for (const issuerDid of issuers) {
      const { notes } = await this._ceramicService.pullStoreDataForDID(publishedModel, issuerDid, DEEPSKILLS_ALIAS)
      issuedDocuments = issuedDocuments.concat(notes)
    }

    // TODO: ADD Filter
    return issuedDocuments
  }

}