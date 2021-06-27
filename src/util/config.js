import Axios from 'axios'
import os from 'os'
import path from 'path'
import PropertiesReader from 'properties-reader'
import { browser } from 'protractor'
import context from './context'

const getEnvPropertiesFile = () => {
  return process.env.ENV || 'production'
}

Axios.interceptors.request.use(
  config => {
    if (context.get('authorization')) config.headers['Authorization'] = context.get('authorization')
    if (context.get('userAccessHash')) config.headers['User-Access'] = context.get('userAccessHash')
    if (context.get('appContextHash')) config.headers['App-Context'] = context.get('appContextHash')
    if (context.get('Content-Type')) config.headers['Content-Type'] = context.get('Content-Type')
    config.headers['Filter-Encoded'] = true
    encodeURI(filterBuilder(config.params))
    return config
  },
  error => Promise.reject(error)
)

const filterBuilder = params => {
  if (!params || !params.filter) return
  if (typeof params.filter === 'string') return
  const filter = params.filter
  const filterKeys = Object.keys(filter)
  let builder = `(`
  filterKeys.forEach((key, index) => {
    builder = `${builder} ${index ? 'and' : ''} ${key} ${operatorResolver(filter[key])}`
  })
  params.filter = `${builder})`
}

const operatorResolver = operator => {
  const operatorKey = Object.keys(operator)[0]
  switch (operatorKey) {
    case '$like':
      return `like "${operator[operatorKey]}"`
    case 'eq':
      return `= ${operator[operatorKey]}`
    case 'in':
      const values = operator[operatorKey]
      if (Array.isArray(values)) {
        const inClausule = values.reduce((anterior, atual) => {
          if (!anterior) return atual
          return ` ${atual}, ${anterior}`
        }, '')
        return ` in (${inClausule})`
      }
      return ` in (${operator[operatorKey]})`
  }
}

const PROPERTIES_FILE_PATH = path.join(path.resolve('./src/env'), `.env.${getEnvPropertiesFile()}`)
const propertiesFile = PropertiesReader(PROPERTIES_FILE_PATH)

export const properties = {
  get: key =>
    propertiesFile.get(`${browser.params.properties}.${key}`) ||
    propertiesFile.get(`${os.hostname()}.${key}`) ||
    propertiesFile.get(`default.${key}`),
  getRaw: key =>
    propertiesFile.get(`${browser.params.properties}.${key}`) ||
    propertiesFile.getRaw(`${os.hostname()}.${key}`) ||
    propertiesFile.getRaw(`default.${key}`),
  set: (key, value) => propertiesFile.set(`${os.hostname()}.${key}`, value)
}

const CONF_JS_FILE = path.join(path.resolve('./src/util'), 'config.path.file.js')
const confJsFile = require(path.resolve(CONF_JS_FILE))
properties.set('resolvers.path', path.resolve(confJsFile.resolversPath))
