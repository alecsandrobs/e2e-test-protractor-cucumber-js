import lerJson from './lerJson'
import filtrar from './filtrar'

export default async (jsonPath, filter) => {
  return filtrar(lerJson(jsonPath), filter)
}
