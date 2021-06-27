import { When } from 'cucumber'
import Emprestimos from '../../pages/Emprestimos'
import { selectAllSendKeys, pressKey } from '../../commands/keyBoard'
import { getElement, getElements, getSubelement } from '../../commands/getElements'
import { resolverValue } from '../../util/utils'
import { chooseOption } from '../../commands/select'
import Commons from '../../pages/Commons'
import { getElementText } from '../../commands/getElement'
import { click } from '../../commands/mouse'
import { adicionarItensEmprestimo } from './commands'

const pagina = new Emprestimos()
const common = new Commons()

When(/^selecionar "(.*?)" no campo tipo do empréstimo$/, async emprestimo => {
  await chooseOption(await getElement(pagina.tipo), pagina.tipos, emprestimo, false)
})
When(/^digitar "(.*?)" no campo data do empréstimo$/, async emprestimo => {
  await selectAllSendKeys(await getElement(pagina.dataEmprestimo), await resolverValue(emprestimo))
  await pressKey('TAB')
})
When(/^selecionar "(.*?)" no campo situação do empréstimo$/, async emprestimo => {
  await chooseOption(await getElement(pagina.situacao), pagina.situacoes, emprestimo, false)
})
When(/^digitar "(.*?)" no campo data de devolução do empréstimo$/, async emprestimo => {
  await selectAllSendKeys(await getElement(pagina.dataDevolucao), await resolverValue(emprestimo))
  await pressKey('TAB')
})
When(/^selecionar "(.*?)" no campo pessoa do empréstimo$/, async emprestimo => {
  await chooseOption(await getElement(pagina.pessoa), pagina.pessoas, emprestimo, false)
})
When(/^digitar "(.*?)" no campo observações do empréstimo$/, async emprestimo => {
  await selectAllSendKeys(await getElement(pagina.observacoes), emprestimo)
})

When(/^digitar "(.*?)" no campo código do item do empréstimo$/, async item => {
  await selectAllSendKeys(await getElement(pagina.itemCodigo), item)
})
When(/^digitar "(.*?)" no campo descrição do item do empréstimo$/, async item => {
  await selectAllSendKeys(await getElement(pagina.itemDescricao), item)
})
When(/^digitar "(.*?)" no campo quantidade do item do empréstimo$/, async item => {
  await selectAllSendKeys(await getElement(pagina.itemQuantidade), item)
})
When(/^digitar "(.*?)" no campo preço do item do empréstimo$/, async item => {
  await selectAllSendKeys(await getElement(pagina.itemPreco), item)
})

When(/^adicionar os itens no empréstimos "(.*?)"$/, async itens => {
  await adicionarItensEmprestimo(itens)
})

When(/^clicar no botão com o título "([^"]*)" do item "(.*?)" do emprestimo$/, async (titulo, item) => {
  let elemento = await getElementText(await getElements(pagina.itemsList), item)
  let subelemento = await getSubelement(elemento, common.buttonTitle(titulo))
  await click(subelemento)
})

When(/^clicar no botão com o título "([^"]*)" do empréstimo "(.*?)"$/, async (titulo, emprestimo) => {
  let elemento = await getElementText(await getElements(pagina.emprestimosList), emprestimo)
  let subelemento = await getSubelement(elemento, common.buttonTitle(titulo))
  await click(subelemento)
})
