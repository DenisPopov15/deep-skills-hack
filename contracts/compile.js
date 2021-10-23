const path = require('path')
const fs = require('fs')
const compiler = require('solc')

const inboxPath = path.resolve(__dirname, 'deepSkillsIssuerRegistry.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

module.exports = compiler.compile(source, 1).contracts[':DeepSkillsIssuerRegistry']