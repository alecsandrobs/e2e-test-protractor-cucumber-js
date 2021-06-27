import { consoleLog } from '../util/utils'
const rootDir = process.cwd()
const fs = require('fs')
const glob = require('glob')
const Gherkin = require('gherkin')
const parser = new Gherkin.Parser()
const featuresPath = `${rootDir}/src/features/**/*.feature`

const plataforma = glob.sync(featuresPath).map(path => parser.parse(fs.readFileSync(path).toString()))
var totalFeatures = plataforma.length
var totalScenarios = 0
var totalExamples = 0
var totalExamplesFeature = 0

consoleLog('-------======= Plataforma =======-------')
consoleLog('')

plataforma.forEach(feature => {
  consoleLog(`${feature.feature.type}: ${feature.feature.name}`)
  let scenariosOutline = feature.feature.children.length
  consoleLog(
    `  ${feature.feature.children[0].type === 'Background' ? --scenariosOutline : scenariosOutline} ${
      scenariosOutline > 1 ? 'scenarios' : 'scenario'
    } ${feature.feature.children[0].type === 'Background' ? 'com background' : ''}`
  )
  totalExamplesFeature = 0
  feature.feature.children.forEach(scenarios => {
    if (scenarios.type === 'Background') {
      // consoleLog(`  ${scenarios.type}: ${scenarios.name}`)
    }
    if (scenarios.type === 'Scenario') {
      totalScenarios++
      totalExamples++
      totalExamplesFeature++
      consoleLog(`     1 Scenario: ${scenarios.name}`)
    } else if (scenarios.type === 'ScenarioOutline') {
      totalScenarios++
      // consoleLog(`  ${scenarios.type}: ${scenarios.name}`)
      scenarios.examples.forEach(examples => {
        if (examples.type === 'Examples') {
          totalExamples += examples.tableBody.length
          totalExamplesFeature += examples.tableBody.length
          // consoleLog(`     ${examples.tableBody.length} ${examples.type}`)
          consoleLog(`     ${examples.tableBody.length} ${examples.tableBody.length > 1 ? 'Scenarios' : 'Scenario'} Outline: ${scenarios.name}`)
        }
      })
    } else {
      // consoleLog(`   ${scenarios.type}: ${scenarios.name}`)
    }
  })
  consoleLog(`       ${totalExamplesFeature} ${totalExamplesFeature > 1 ? 'examples' : 'example'}`)
  consoleLog('')
})

consoleLog('----------------------------------------')
consoleLog(`Total de ${totalFeatures} features`)
consoleLog(`Total de ${totalScenarios} scenarios`)
consoleLog(`Total de ${totalExamples} examples`)
consoleLog('----------------------------------------')

consoleLog('')
consoleLog('-------==========================-------')

var fileContent = JSON.stringify(plataforma)

fs.writeFile('./features.json', fileContent, err => {
  if (err) {
    console.error(err)
    return
  }
  consoleLog('File (features.json) has been created')
})
