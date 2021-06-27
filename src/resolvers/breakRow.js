import { replaceAll } from '../util/utils'

export default text => {
  return replaceAll(text, '{¬}', '\n')
}
