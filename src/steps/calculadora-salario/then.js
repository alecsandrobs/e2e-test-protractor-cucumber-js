import CalculadoraSalario from '../../pages/calculadora/CalculadoraSalario'
import { verifyHaveText } from '../../commands/verify'
import { getElement } from '../../commands/getElements'
const { Then } = require('cucumber')

const pagina = new CalculadoraSalario()

Then(/^deveria exibir "([^"]*)" no valor do salário bruto$/, async salarioBruto => {
  await verifyHaveText(await getElement(pagina.salarioBruto), salarioBruto)
})
Then(/^deveria exibir "([^"]*)" no valor do INSS$/, async inss => {
  await verifyHaveText(await getElement(pagina.inss), inss)
})
Then(/^deveria exibir "([^"]*)" no valor do IRRF$/, async irrf => {
  await verifyHaveText(await getElement(pagina.irrf), irrf)
})
Then(/^deveria exibir "([^"]*)" no valor do salário sem impostos$/, async salarioSemImpostos => {
  await verifyHaveText(await getElement(pagina.salarioSemImpostos), salarioSemImpostos)
})
Then(/^deveria exibir "([^"]*)" no valor do salário líquido$/, async salarioLiquido => {
  await verifyHaveText(await getElement(pagina.salarioLiquido), salarioLiquido)
})
