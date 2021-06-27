import jp from 'jsonpath'
import { resolverValue } from '../util/utils'

export default async (object, filter = '$..*') => {
  const objectResolver = await resolverValue(object)
  const teste = await jp.query(objectResolver, filter)
  return teste
}
