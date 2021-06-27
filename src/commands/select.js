import { element, by, browser } from 'protractor'
import { getElementText } from './getElement'
import { getElements, getElement, getSubelement } from './getElements'
import Commons from '../pages/Commons'
import { click } from './mouse'
import { waitForElementPresent } from './verify'
import { sendkeys } from './keyBoard'
import { replaceAll } from '../util/utils'

const pgCommons = new Commons()

export const sendKeysSelectMulti = async (element, text, sort) => {
  if (!text) return
  let obj
  try {
    obj = await JSON.parse(text)
    if (typeof obj === 'object') {
      if (await Array.isArray(obj)) {
        for (let o of obj) {
          await sendKeysSelect(element, o, sort)
          await browser.sleep(500)
        }
      }
    }
  } catch (error) {
    await sendKeysSelect(element, text, sort)
  }
}

export const chooseSelectMulti = async (element, text, sort) => {
  if (!text) return
  let obj
  try {
    obj = await JSON.parse(text)
    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        for (let o of obj) {
          await chooseSelect(element, o, sort)
        }
      }
    }
  } catch (error) {
    await chooseSelect(element, text, sort)
  }
}

export const sendKeysSelect = async (elementFound, text, sort) => {
  if (!text) return
  let subElementFound = await getSubelement(elementFound, by.css('input'))
  await sendkeys(subElementFound, text)
  if (!sort || typeof sort === 'number') {
    await chooseSelectList(text, sort)
  } else if (typeof sort === 'string') {
    await chooseSelectList(replaceAll(sort, '{¬}', '\n'), 1, true)
  }
}

export const chooseSelect = async (element, text, sort) => {
  if (!text) return
  await element.click()
  await chooseSelectList(text, sort)
}

export const chooseSelectList = async (text, sort, equals = false) => {
  if (!text) return
  await waitForElementPresent(element(pgCommons.selectResults), 30, `Waiting for element css "select-results".`)
  await waitForElementPresent(element(pgCommons.selectResultLabel), 30, 'Waiting for element css "select-result-label".')
  let elementos = await getElements(pgCommons.selectResultLabel)
  let elementFound = null
  if (equals) {
    elementFound = await getElementText(elementos, text)
  } else {
    elementFound = await getElement(by.cssContainingText(pgCommons.selectResultLabelText, text), sort)
  }
  await click(elementFound)
}

export const chooseOption = async (elementFound, byOptions, text, exactValue = false) => {
  if (!text) return
  await click(elementFound)
  await chooseOptionList(text, byOptions, exactValue)
}

export const chooseOptionList = async (text, byOptions, exactValue) => {
  if (!text) return
  let elemento = null
  if (exactValue) {
    elemento = await getElementText(await getElements(byOptions), text)
  } else {
    elemento = await element(by.cssContainingText('option', text))
  }
  await click(elemento)
}
