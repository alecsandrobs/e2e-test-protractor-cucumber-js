import { getService } from '../services/services'
import { properties } from '../util/config'

export default async function getPessoa (filter) {
  return getService(`${properties.get('url')}/pessoas`, filter, 1000)
}
