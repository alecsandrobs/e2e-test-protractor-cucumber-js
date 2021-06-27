import { clearSendKeys } from '../../commands/keyBoard'
import { getElement } from '../../commands/getElements'
import CalculadoraAposentadoria from '../../pages/calculadora/CalculadoraAposentadoria'
const { When } = require('cucumber')

const pagina = new CalculadoraAposentadoria()

When(/^digitar "([^"]*)" no campo valor desejado$/, async valor => {
  await clearSendKeys(await getElement(pagina.valor), valor)
})
When(/^digitar "([^"]*)" no campo anos de contribuição$/, async anos => {
  await clearSendKeys(await getElement(pagina.anos), anos)
})
When(/^digitar "([^"]*)" no campo taxa$/, async taxa => {
  await clearSendKeys(await getElement(pagina.taxa), taxa)
})
