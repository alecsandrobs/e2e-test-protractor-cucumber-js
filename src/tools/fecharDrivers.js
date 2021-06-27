import { consoleLog } from '../util/utils'
const { exec } = require('child_process')

module.exports = function fecharDrivers (os) {
  switch (os) {
    case 'linux':
      exec(`ps aux | grep chromedriver | awk '{print $2}' | xargs kill`)
      break
    case 'windows':
      exec('taskkill -f -im chromedriver.exe')
      break
    default:
      consoleLog(`Doesn't have command supported for the S.O. "${os}" yet`)
      break
  }
}
