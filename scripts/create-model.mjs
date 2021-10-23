import { writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ModelManager } from '@glazed/devtools'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays'
``
import { SEED } from '../config/index.mjs'

if (!SEED) {
  throw new Error('Missing SEED environment variable')
}

// The seed must be provided as an environment variable
const seed = fromString(SEED, 'base16')
// Create and authenticate the DID
const did = new DID({
  provider: new Ed25519Provider(seed),
  resolver: getResolver(),
})
await did.authenticate()

// Connect to the local Ceramic node
const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com')
ceramic.did = did

// Create a manager for the model
const manager = new ModelManager(ceramic)

// Create the schemas
const deepskillSchemaID = await manager.createSchema('DeepSkill', {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Deep Skill',
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date-time',
      title: 'date',
      maxLength: 30,
    },
    taskname: {
      type: 'string',
      title: 'taskname',
    },
    issuerDid: {
      type: 'string',
      title: 'issuerDid'
    },
    holderDid: {
      type: 'string',
      title: 'holderDid'
    },
    signature: {
      type: 'string',
      title: 'signature'
    },
    description: {
      type: 'string',
      title: 'description',
      maxLength: 4000,
    },
  },
})
const deepskillsSchemaID = await manager.createSchema('DeepSkills', {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'DeepSkillsList',
  type: 'object',
  properties: {
    deepskills: {
      type: 'array',
      title: 'deepskills',
      items: {
        type: 'object',
        title: 'DeepSkillItem',
        properties: {
          id: {
            $comment: `cip88:ref:${manager.getSchemaURL(deepskillSchemaID)}`,
            type: 'string',
            pattern: '^ceramic://.+(\\?version=.+)?',
            maxLength: 150,
          },
          title: {
            type: 'string',
            title: 'title',
            maxLength: 100,
          },
        },
      },
    },
  },
})

// Create the definition using the created schema ID
await manager.createDefinition('deepskills', {
  name: 'deepskills',
  description: 'Skill credentials',
  schema: manager.getSchemaURL(deepskillsSchemaID),
})

await manager.createTile(
  'placeholderSkill',
  { text: 'This is a placeholder for the skill contents...' },
  { schema: manager.getSchemaURL(deepskillSchemaID) },
)

// Write model to JSON file
console.log('JSON.stringify(manager.toJSON())!!!', JSON.stringify(manager.toJSON()))
await writeFile(
  new URL('model.json', import.meta.url),
  JSON.stringify(manager.toJSON()),
)
console.log('Encoded model written to scripts/model.json file')
