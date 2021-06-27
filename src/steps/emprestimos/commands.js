import Emprestimos from '../../pages/Emprestimos'
import { clicarBotaoTexto } from '../generics/commands.when'
import { verifyTrue, verifyAttributeValue } from '../../commands/verify'
import { selectAllSendKeys } from '../../commands/keyBoard'
import { getElement, getElements, getSubelement } from '../../commands/getElements'
import { getElementText } from '../../commands/getElement'
import Commons from '../../pages/Commons'
import { clickWait } from '../../commands/mouse'

const pagina = new Emprestimos()
const common = new Commons()

export const adicionarItensEmprestimo = async informacao => {
  if (!informacao) return
  let itens = []
  try {
    itens = await JSON.parse(informacao)
  } catch (error) {
    await verifyTrue(false, `A informação "${informacao}" não está no formato JSON.\n${error}`)
  }
  for (const item of itens) {
    await clicarBotaoTexto('Item')
    if (item.codigo) await selectAllSendKeys(await getElement(pagina.itemCodigo), item.codigo)
    if (item.descricao) await selectAllSendKeys(await getElement(pagina.itemDescricao), item.descricao)
    if (item.quantidade) await selectAllSendKeys(await getElement(pagina.itemQuantidade), item.quantidade)
    if (item.preco) await selectAllSendKeys(await getElement(pagina.itemPreco), item.preco)
    await clicarBotaoTexto('Salvar', 2)
  }
}

export const verificarItensEmprestimo = async esperado => {
  if (!esperado) return
  let itens = []
  try {
    itens = await JSON.parse(esperado)
  } catch (error) {
    await verifyTrue(false, `A informação "${esperado}" não está no formato JSON.\n${error}`)
  }
  for (const item of itens) {
    if (item.descricao) {
      let elemento = await getElementText(await getElements(pagina.itemsList), item.descricao)
      let subelementoEditar = await getSubelement(elemento, common.buttonTitle('Editar'))
      await clickWait(subelementoEditar)
      if (item.codigo) await verifyAttributeValue(await getElement(pagina.itemCodigo), item.codigo)
      if (item.descricao) await verifyAttributeValue(await getElement(pagina.itemDescricao), item.descricao)
      if (item.quantidade) await verifyAttributeValue(await getElement(pagina.itemQuantidade), item.quantidade)
      if (item.preco) await verifyAttributeValue(await getElement(pagina.itemPreco), item.preco)
      await clicarBotaoTexto('Cancelar', 2)
    }
  }
}
