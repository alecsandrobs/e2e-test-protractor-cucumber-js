import fs from 'fs'
import os from 'os'
import path from 'path'
import { browser } from 'protractor'
import { properties } from './config'

const rootDir = process.cwd()
const glob = require('glob')
const Gherkin = require('gherkin')
const parser = new Gherkin.Parser()
const jp = require('jsonpath')

export const consoleLog = (text) => {
  if (process.env.LOG && process.env.LOG === 'yes') console.log(text)
}

export const getCapability = async capability => {
  let capabilities = await browser.getCapabilities()
  return capabilities.get(capability)
}

export const getFeatures = async path => {
  const features = await glob.sync(`${rootDir}/${path}`).map(path => parser.parse(fs.readFileSync(path).toString()))
  return features
}

export const getFeature = async (path, sort = 0) => {
  if (properties.get('feature') && typeof properties.get('feature') === 'object') return properties.get('feature')
  const feature = await getFeatures(path)
  return feature[sort].feature
}

export const getFeatureName = async path => {
  const feature = await getFeature(path)
  return feature.name
}

export const setFeature = async path => {
  await properties.set('feature', getFeature(path))
}

export const isFeatureChanged = async () => {
  return properties.get('featureChanged')
}

export const isFirstRun = async () => {
  return properties.get('primeiraExecucao')
}

export const setFirstRun = async firstRun => {
  return properties.get('primeiraExecucao', firstRun)
}

export const setFeatureChanged = async changed => {
  await properties.set('featureChanged', changed)
}

export const getScenarioOutline = async (path, name) => {
  if (properties.get('scenariosOutline') && typeof properties.get('scenariosOutline') === 'object') return properties.get('scenariosOutline')
  const feature = await getFeature(path)
  let scenarios = jp.query(feature.children, `$..[?((@.type=="ScenarioOutline" || @.type=="Scenario") && @.name=="${name}")]`)
  return scenarios[0]
}

export const setScenarioOutline = async (path, name) => {
  await properties.set('scenariosOutline', getScenarioOutline(path, name))
}

export const getScenarioNumber = async () => {
  return properties.get('scenarioNumber') ? properties.get('scenarioNumber') : 1
}

export const setScenarioNumber = async number => {
  properties.set('scenarioNumber', number)
}

export const removeAccents = newStringComAcento => {
  var string = newStringComAcento
  var mapaAcentosHex = {
    a: /[\xE0-\xE6]/g,
    A: /[\xC0-\xC6]/g,
    e: /[\xE8-\xEB]/g,
    E: /[\xC8-\xCB]/g,
    i: /[\xEC-\xEF]/g,
    I: /[\xCC-\xCF]/g,
    o: /[\xF2-\xF6]/g,
    O: /[\xD2-\xD6]/g,
    u: /[\xF9-\xFC]/g,
    U: /[\xD9-\xDC]/g,
    c: /\xE7/g,
    C: /\xC7/g,
    n: /\xF1/g,
    N: /\xD1/g
  }

  for (var letra in mapaAcentosHex) {
    var expressaoRegular = mapaAcentosHex[letra]
    string = string.replace(expressaoRegular, letra)
  }

  return string
}

export const setParams = () => {
  properties.set('primeiraExecucao', true)
  properties.set('feature', '[unknow feature]')
  properties.set('featureChanged', false)
  properties.set('scenariosOutline', '[unknow scenario]')
  properties.set('scenario', '[unknow scenario]')
  properties.set('scenarioChanged', false)
  properties.set('scenarioStatus', '[none]')
  properties.set('scenarioNumber', 1)
}

export const setScenarioStatus = async scenario => {
  const feature = await getFeature(scenario.sourceLocation.uri)
  const scenariosOutline = await getScenarioOutline(scenario.sourceLocation.uri, scenario.pickle.name)

  if (!properties.get('feature') || properties.getRaw('feature') !== feature.name) {
    properties.set('feature', feature.name)
    properties.set('featureChanged', true)
  } else {
    properties.set('featureChanged', false)
  }

  if (properties.get('featureChanged') || (!properties.get('scenario') || properties.getRaw('scenario') !== scenario.pickle.name)) {
    properties.set('scenario', scenario.pickle.name)
    properties.set('scenarioChanged', true)
    properties.set('scenarioNumber', 1)
    properties.set('scenarioNumberTotal', scenariosOutline.examples ? scenariosOutline.examples[0].tableBody.length : 1)
  } else {
    properties.set('scenarioChanged', false)
    properties.set('scenarioNumber', properties.get('scenarioNumber') + 1)
  }
  // consoleLog(`Cenário atual =======> ${properties.getRaw('scenarioNumber').toString().blue}`.green)
  // consoleLog(`Cenários quantidade => ${properties.getRaw('scenarioNumberTotal').toString().blue}`.yellow)
}

export const removeSpecialCharacters = text => {
  const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
  const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[\s\W-]+/g, '-') // Replace spaces, non-word characters and dashes with a single dash (-)
}

export const replaceAll = (text, from, to) => {
  return text.replace(new RegExp(from, 'g'), to)
}

export const normalizeId = id => {
  return id.replace(/:/g, '\\:')
}

export const setValue = (obj, path, value) => {
  const pathArray = path.split('.')
  let pointer = obj || {}
  for (let i = 0, len = pathArray.length; i < len; i++) {
    const last = i === len - 1
    const pos = pathArray[i]
    if (last) {
      pointer[pos] = value
      continue
    }
    if (!pointer[pos]) {
      pointer[pos] = {}
    }
    pointer = pointer[pos]
  }
  return obj
}

export const getValue = (obj, path) => {
  if (!path) return obj
  const pathArray = path.split('.')
  var pointer = obj
  for (var i = 0, len = pathArray.length; i < len; i++) {
    const pos = pathArray[i]
    if (pointer[pos] === undefined || pointer[pos] === null) {
      return pointer[pos]
    }
    if (i === len - 1) {
      return pointer[pos]
    }
    pointer = pointer[pos]
  }
}

export const getPage = (client, page) => {
  return getValue(client.page, page)()
}

export const resolverValue = async value => {
  if (!value) return value
  if (typeof value !== 'string') return value
  const resolverExpression = value.match(/^(@|\/)(([\w-/]+)\((.*)?\))(:(.*))?$/i)
  if (!resolverExpression) return value
  const tipoResolver = resolverExpression[1] || '@'
  const resolverName = resolverExpression[3] || 'undefined'
  const resolverParams = resolverExpression[4]
  const valuePath = resolverExpression[6] || ''
  return resolverExecute({
    resolverExpression: `${tipoResolver}${resolverName}`,
    resolverParams,
    valuePath
  })
}

export const resolverExecute = async ({ resolverExpression = '@undefined', resolverParams = '', valuePath = '' }) => {
  const tipoResolver = resolverExpression.substr(0, 1)
  const resolverName = resolverExpression.substr(1)
  const resolverImp = getResolverFile(tipoResolver === '@' ? resolverName : 'defaultResolver')
  if (!resolverImp) throw new Error(`Resolver ${resolverImp} not exists!`)
  let result
  if (tipoResolver === '@') {
    if (resolverParams) {
      result = await resolverImp.default.apply(undefined, resolverParams.split(',').map(param => param.trim()))
    } else {
      result = await resolverImp.default.apply()
    }
  } else {
    result = await resolverImp.default.call(undefined, resolverName, resolverParams)
  }
  // if (!result) return null
  return getValue(result, valuePath)
}

const getResolverFile = resolverName => {
  if (fs.existsSync(path.join(properties.getRaw('resolvers.path'), `${resolverName}.js`))) {
    return require(path.join(properties.getRaw('resolvers.path'), resolverName))
  }
  return require(path.join(__dirname, 'resolvers', resolverName))
}

export const datatableToObjects = async tableDriven => {
  const headers = tableDriven[0]
  let objs = []
  for (let i = 1, length = tableDriven.length; i < length; i++) {
    const values = tableDriven[i]
    let obj = {}
    for (let i = 0; i < headers.length; i++) {
      if (values[i].trim()) {
        const header = headers[i]
        const value = await resolverValue(values[i])
        obj = setValue(obj, header, value)
      }
    }
    objs.push(obj)
  }
  return objs
}

export const datatableToQuery = tableDriven => {
  const header = tableDriven[0]
  const values = []
  for (let i = 1, length = tableDriven.length; i < length; i++) {
    const line = tableDriven[i]
    let row = []
    for (let i = 0; i < header.length; i++) {
      row.push(line[i])
    }
    values.push(row)
  }
  return {
    header,
    values
  }
}

export const getProperty = (properties, key) => properties.get(`${os.hostname()}.${key}`) || properties.get(`default.${key}`)
