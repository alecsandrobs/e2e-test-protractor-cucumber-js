import { Before, BeforeAll } from 'cucumber'
import { goToUrl, setTimeouts } from '../../commands/browser'
import { properties } from '../../util/config'
import { setParams, setScenarioStatus } from '../../util/utils'

BeforeAll({ timeout: 15 * 1000 }, async function () {
  await setTimeouts(30, 30, 30)
  setParams()
  await goToUrl(properties.get('url'))
})

Before(async function (scenario) {
  await setScenarioStatus(scenario)
})

Before(async function () {
  // if (properties.get('scenarioChanged')) await goToUrl(properties.get('url'))
})
