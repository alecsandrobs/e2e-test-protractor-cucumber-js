import { clearSendKeys } from '../../commands/keyBoard'
import { getElement } from '../../commands/getElements'
import CalculadoraSalario from '../../pages/calculadora/CalculadoraSalario'
const { When } = require('cucumber')

const pagina = new CalculadoraSalario()

When(/^digitar "([^"]*)" no campo nome$/, async nome => {
  await clearSendKeys(await getElement(pagina.nome), nome)
})
When(/^digitar "([^"]*)" no campo salário bruto$/, async salario => {
  await clearSendKeys(await getElement(pagina.salario), salario)
})
When(/^digitar "([^"]*)" no campo dissídio$/, async dissidio => {
  await clearSendKeys(await getElement(pagina.dissidio), dissidio)
})
When(/^digitar "([^"]*)" no campo dependentes$/, async dependentes => {
  await clearSendKeys(await getElement(pagina.dependentes), dependentes)
})
When(/^digitar "([^"]*)" no campo auxílios$/, async auxilios => {
  await clearSendKeys(await getElement(pagina.auxilios), auxilios)
})
When(/^digitar "([^"]*)" no campo descontos$/, async descontos => {
  await clearSendKeys(await getElement(pagina.descontos), descontos)
})
