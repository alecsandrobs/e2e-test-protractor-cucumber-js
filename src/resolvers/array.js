import { resolverValue } from '../util/utils'

export default async (...values) => {
  const valuesResolve = await Promise.all(values.map(v => resolverValue(v)))
  return valuesResolve
}
