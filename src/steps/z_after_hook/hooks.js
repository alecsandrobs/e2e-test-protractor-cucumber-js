import { After, AfterAll } from 'cucumber'
import { browser } from 'protractor'
import { closeOthersWindows, setTimeouts, takeScreenShot } from '../../commands/browser'
import { pressKey } from '../../commands/keyBoard'
import { properties } from '../../util/config'
import { clicarBotaoTextoSeExistir } from '../generics/commands.when'

AfterAll({ timeout: 15 * 1000 }, async () => {
})

After(async function () {
  await pressKey('ESCAPE', 3)
  await browser.sleep(1000)
})

After(async function () {
  await clicarBotaoTextoSeExistir('Cancelar')
})

After(async function () {
  await closeOthersWindows()
})

After(async function () {
  if (properties.get('scenarioStatus') !== 'passed') {
    await browser.waitForAngularEnabled(true)
    await setTimeouts(30, 30, 30)
  }
})

After(async function (scenario) {
  properties.set('scenarioStatus', scenario.result.status)
  properties.set('primeiraExecucao', false)
})

After(async function (scenario) {
  await takeScreenShot(this, scenario.result.status !== 'passed')
})
