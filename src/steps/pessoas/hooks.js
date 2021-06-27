import { Before, After } from 'cucumber'
import { properties } from '../../util/config'
import { goToUrl } from '../../commands/browser'

Before({ tags: '@Pessoas' }, async function (scenario) {
  if (properties.get('scenarioChanged')) await goToUrl(properties.get('url'))
})

After({ tags: '@Pessoas' }, async function () {
})
