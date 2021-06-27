import { When } from 'cucumber'
import { getElementText } from '../../commands/getElement'
import { getElement, getElements, getSubelement } from '../../commands/getElements'
import { clearSendKeys } from '../../commands/keyBoard'
import { click } from '../../commands/mouse'
import Commons from '../../pages/Commons'
import Pessoas from '../../pages/Pessoas'

const pagina = new Pessoas()
const common = new Commons()

When(/^digitar "(.*?)" no campo nome da pessoa$/, async nome => {
  await clearSendKeys(await getElement(pagina.nome), nome)
})
When(/^digitar "(.*?)" no campo telefone da pessoa$/, async telefone => {
  await clearSendKeys(await getElement(pagina.telefone), telefone)
})
When(/^digitar "(.*?)" no campo e-mail da pessoa$/, async email => {
  await clearSendKeys(await getElement(pagina.email), email)
})

When(/^clicar no botão com o título "([^"]*)" da pessoa "(.*?)"$/, async (titulo, pessoa) => {
  let elemento = await getElementText(await getElements(pagina.pessoas), pessoa)
  let subelemento = await getSubelement(elemento, common.buttonTitle(titulo))
  await click(subelemento)
})
