import { Then } from 'cucumber'
import { element } from 'protractor'
import { getElement, getElements } from '../../commands/getElements'
import { verifyAttributeValue, verifyElementsLength, verifyHaveNoTextList, verifyHaveText, verifyHaveTextList } from '../../commands/verify'
import Emprestimos from '../../pages/Emprestimos'
import { resolverValue } from '../../util/utils'
import { verificarItensEmprestimo } from './commands'

const pagina = new Emprestimos()

Then(/^deveria exibir "([^"]*)" no campo código do empréstimo$/, async esperado => {
  await verifyAttributeValue(await getElement(pagina.codigo), esperado)
})
Then(/^deveria exibir "([^"]*)" no campo tipo do empréstimo$/, async esperado => {
  await verifyHaveText(await getElement(pagina.tipo), esperado)
})
Then(/^deveria exibir "([^"]*)" no campo data do empréstimo$/, async esperado => {
  await verifyAttributeValue(await getElement(pagina.dataEmprestimo), await resolverValue(esperado))
})
Then(/^deveria exibir "([^"]*)" no campo situação do empréstimo$/, async esperado => {
  await verifyHaveText(await getElement(pagina.situacao), esperado)
})
Then(/^deveria exibir "([^"]*)" no campo data de devolução do empréstimo$/, async esperado => {
  await verifyAttributeValue(await getElement(pagina.dataDevolucao), await resolverValue(esperado))
})
Then(/^deveria exibir "([^"]*)" no campo pessoa do empréstimo$/, async esperado => {
  await verifyHaveText(await getElement(pagina.pessoa), esperado)
})
Then(/^deveria exibir "([^"]*)" no campo observações do empréstimo$/, async esperado => {
  await verifyAttributeValue(await getElement(pagina.observacoes), esperado)
})

Then(/^deveria exibir "([^"]*)" no campo código do item do empréstimo$/, async esperado => {
  await verifyAttributeValue(await getElement(pagina.itemCodigo), esperado)
})
Then(/^deveria exibir "([^"]*)" no campo descrição do item do empréstimo$/, async esperado => {
  await verifyAttributeValue(await getElement(pagina.itemDescricao), esperado)
})
Then(/^deveria exibir "([^"]*)" no campo quantidade do item do empréstimo$/, async esperado => {
  await verifyAttributeValue(await getElement(pagina.itemQuantidade), esperado)
})
Then(/^deveria exibir "([^"]*)" no campo preço do item do empréstimo$/, async esperado => {
  await verifyAttributeValue(await getElement(pagina.itemPreco), esperado)
})
Then(/^deveria exibir "(.*?)" nos campos itens no empréstimos$/, async itens => {
  await verificarItensEmprestimo(itens)
})

Then(/^deveria existir (\d+) itens do empréstimo$/, async esperado => {
  await verifyElementsLength(element.all(pagina.itemsList), esperado)
})
Then(/^deveria exibir "(.*?)" na lista de itens do empréstimo$/, async esperado => {
  let elementos = await getElements(pagina.itemsList)
  await verifyHaveTextList(elementos, esperado)
})
Then(/^deveria exibir "(.*?)" na linha (\d+) da lista de itens do empréstimo$/, async (esperado, linha) => {
  let elementos = await getElements(pagina.itemsList)
  await verifyHaveTextList(elementos, esperado, linha)
})
Then(/^não deveria exibir "(.*?)" na lista de itens do empréstimo$/, async esperado => {
  let elementos = await getElements(pagina.itemsList)
  await verifyHaveNoTextList(elementos, esperado)
})

Then(/^deveria existir (\d+) empréstimos$/, async esperado => {
  await verifyElementsLength(element.all(pagina.emprestimosList), esperado)
})
Then(/^deveria exibir "(.*?)" na lista de empréstimos$/, async esperado => {
  let elementos = await getElements(pagina.emprestimosList)
  await verifyHaveTextList(elementos, await resolverValue(esperado))
})
Then(/^deveria exibir "(.*?)" na linha (\d+) da lista de empréstimos$/, async (esperado, linha) => {
  let elementos = await getElements(pagina.emprestimosList)
  await verifyHaveTextList(elementos, await resolverValue(esperado), linha)
})
Then(/^não deveria exibir "(.*?)" na lista de empréstimos$/, async esperado => {
  let elementos = await getElements(pagina.emprestimosList)
  await verifyHaveNoTextList(elementos, await resolverValue(esperado))
})
