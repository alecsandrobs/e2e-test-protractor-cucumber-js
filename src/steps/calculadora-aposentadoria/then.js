import { verifyHaveText } from '../../commands/verify'
import { getElement } from '../../commands/getElements'
import CalculadoraAposentadoria from '../../pages/calculadora/CalculadoraAposentadoria'
const { Then } = require('cucumber')

const pagina = new CalculadoraAposentadoria()

Then(/^deveria exibir "([^"]*)" no valor a ser investido ao mês$/, async investimento => {
  await verifyHaveText(await getElement(pagina.investimento), investimento)
})
