// import Commons from '../../pages/Commons'
import { by } from 'protractor'
import { getElement, getSubelement } from '../../commands/getElements'
import { selectAllSendKeys } from '../../commands/keyBoard'
import { clickWait } from '../../commands/mouse'

// const pagina = new Commons()

export const clicarBotaoTextoSeExistir = async (texto, ordem = 1) => {
  let elemento = await getElement(by.buttonText(texto), ordem)
  if (elemento) {
    await clickWait(elemento, 1)
  }
}

export const clicarBotaoTexto = async (texto, ordem = 1) => {
  let elemento = await getElement(by.buttonText(texto), ordem)
  await clickWait(elemento, 1)
}

export const clicarBotaoTextoParcial = async (texto, ordem = 1) => {
  let elemento = await getElement(by.partialButtonText(texto), ordem)
  await clickWait(elemento, 1)
}

export const clicarBotaoTituloSeExistir = async (texto, ordem = 1) => {
  let elemento = await getElement(by.css(`button[title="${texto}"]`), ordem)
  if (elemento) {
    await clickWait(elemento, 1)
  }
}

export const clicarBotaoTitulo = async (texto, ordem = 1) => {
  if (!texto) return
  let elemento = await getElement(by.css(`button[title="${texto}"]`), ordem)
  await clickWait(elemento, 1)
}

export const clicarLinkTextoSeExistir = async (texto, ordem = 1) => {
  let elemento = await getElement(by.linkText(texto), ordem)
  if (elemento) {
    await clickWait(elemento, 1)
  }
}

export const clicarLinkTexto = async (texto, ordem = 1) => {
  let elemento = await getElement(by.linkText(texto), ordem)
  await clickWait(elemento, 1)
}

export const clicarLinkTextoParcialSeExistir = async (texto, ordem = 1) => {
  let elemento = await getElement(by.partialLinkText(texto), ordem)
  if (elemento) {
    await clickWait(elemento, 1)
  }
}

export const clicarLinkTextoParcial = async (texto, ordem = 1) => {
  let elemento = await getElement(by.partialLinkText(texto), ordem)
  await clickWait(elemento, 1)
}

export const clicarLinkTituloSeExistir = async (texto, ordem = 1) => {
  let elemento = await getElement(by.css(`a[title="${texto}"]`), ordem)
  if (elemento) {
    await clickWait(elemento, 1)
  }
}

export const clicarLinkTitulo = async (texto, ordem = 1) => {
  let elemento = await getElement(by.css(`a[title="${texto}"]`), ordem)
  await clickWait(elemento, 1)
}

export const digitarCampoPesquisar = async (informacao, ordem = 1) => {
  if (!informacao) return
  let elemento = await getElement(by.css('input[placeholder="Pesquisa"]'), ordem)
  await selectAllSendKeys(elemento, informacao)
}

export const digitarCampoPesquisarModal = async (informacao, ordem = 1) => {
  let elemento = await getElement(by.css('.modal-content'))
  let subElemento = await getSubelement(elemento, by.css('input[placeholder="Pesquisa"]'), ordem)
  await selectAllSendKeys(subElemento, informacao)
}
