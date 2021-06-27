import { When } from 'cucumber'
import { by } from 'protractor'
import { waitSeconds } from '../../commands/browser'
import { click } from '../../commands/mouse'
import { getElement } from '../../commands/getElements'
import Commons from '../../pages/Commons'

const common = new Commons()

When(/^aguardar (\d+) segundos?$/, async tempo => {
  await waitSeconds(tempo)
})

When(/^clicar no link com o texto "([^"]*)"$/, async texto => {
  await click(await getElement(by.linkText(texto)))
})

When(/^clicar no link com o título "([^"]*)"$/, async titulo => {
  await click(await getElement(common.linkTitle(titulo)))
})

When(/^clicar no botão com o texto "([^"]*)"$/, async texto => {
  await click(await getElement(by.buttonText(texto)))
})

When(/^clicar no (\d+)º botão com o texto "([^"]*)"$/, async (ordem, texto) => {
  await click(await getElement(by.buttonText(texto), ordem))
})

When(/^clicar no botão com o título "([^"]*)"$/, async titulo => {
  await click(await getElement(common.buttonTitle(titulo)))
})
