import { Given } from 'cucumber'
import { by } from 'protractor'
import { goToUrl, waitSeconds } from '../../commands/browser'
import { getElementText } from '../../commands/getElement'
import { getElement, getElements } from '../../commands/getElements'
import { click } from '../../commands/mouse'
import Menu from '../../pages/Menu'
import { properties } from '../../util/config'
import { removeAccents } from '../../util/utils'

const pagina = new Menu()

Given(/^o usuário acessou o ambiente de "([^"]*)" "(.*?)"$/, async (ambiente, repete) => {
  if (repete.toLowerCase().includes('feature') && !properties.get('featureChanged')) return
  if (repete.toLowerCase().includes('cenário') && !properties.get('scenarioChanged')) return
  await goToUrl(`${properties.get('url')}/#!/${removeAccents(ambiente.toLowerCase())}/list`)
  await waitSeconds(2)
})

Given(/^o usuário acessou "([^"]*)" "(.*?)"$/, async (menu, repete) => {
  if (repete.toLowerCase().includes('feature') && !properties.get('featureChanged')) return
  if (repete.toLowerCase().includes('cenário') && !properties.get('scenarioChanged')) return
  await click(await getElement(by.id('main')))
  await waitSeconds(0.5)
  await click(await getElement(by.linkText(menu)))
})

Given(/^o usuário acessou o menu "([^"]*)" "(.*?)"$/, async (menu, repete) => {
  if (repete.toLowerCase().includes('feature') && !properties.get('featureChanged')) return
  if (repete.toLowerCase().includes('cenário') && !properties.get('scenarioChanged')) return
  let elemento = await getElementText(await getElements(pagina.menu), menu)
  await click(elemento)
})

Given(/^acessou a url "([^"]*)" "(.*?)"$/, async (url, repete) => {
  if (repete.toLowerCase().includes('feature') && !properties.get('featureChanged')) return
  if (repete.toLowerCase().includes('cenário') && !properties.get('scenarioChanged')) return
  await goToUrl(url)
  await waitSeconds(2)
})
