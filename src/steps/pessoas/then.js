import { Then } from 'cucumber'
import { element } from 'protractor'
import { getElement, getElements } from '../../commands/getElements'
import { verifyAttributeValue, verifyElementsLength, verifyHaveNoTextList, verifyHaveTextList } from '../../commands/verify'
import Pessoas from '../../pages/Pessoas'

const pagina = new Pessoas()

Then(/^deveria exibir "(.*?)" no campo nome da pessoa$/, async esperado => {
  let elemento = await getElement(pagina.nome)
  await verifyAttributeValue(elemento, esperado)
})
Then(/^deveria exibir "(.*?)" no campo telefone da pessoa$/, async esperado => {
  await verifyAttributeValue(await getElement(pagina.telefone), esperado)
})
Then(/^deveria exibir "(.*?)" no campo e-mail da pessoa$/, async esperado => {
  await verifyAttributeValue(await getElement(pagina.email), esperado)
})

Then(/^deveria existir (\d+) pessoas$/, async esperado => {
  await verifyElementsLength(element.all(pagina.pessoas), esperado)
})
Then(/^deveria exibir "(.*?)" na lista de pessoas$/, async esperado => {
  let elementos = await getElements(pagina.pessoas)
  await verifyHaveTextList(elementos, esperado)
})
Then(/^não deveria exibir "(.*?)" na lista de pessoas$/, async esperado => {
  let elementos = await getElements(pagina.pessoas)
  await verifyHaveNoTextList(elementos, esperado)
})
