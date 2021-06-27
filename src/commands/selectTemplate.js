import { browser, element } from 'protractor'
import { isElementPresent, getElementText } from './getElement'
import Commons from '../pages/Commons'
import { selectAllSendKeys, pressKey, clearSendKeys, typeKeys } from './keyBoard'
import { getElements } from './getElements'
import { click } from './mouse'

const pagina = new Commons()

export const sendKeysTemplateMulti = async (element, text, exactValue) => {
  if (!text) return
  let obj
  try {
    obj = JSON.parse(text)
    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        for (let o of obj) {
          await chooseTemplateList(element, o, exactValue)
        }
      }
    }
  } catch (error) {
    await chooseTemplateList(element, text, exactValue)
  }
}

export const clearSendKeysTemplate = async (elementFind, text) => {
  if (!text) return
  await clearSendKeys(elementFind, text).then(() => {
    return browser.sleep(1000)
  })
  if (await isElementPresent(element(pagina.templateList))) await chooseTemplateList(text)
}

export const selectAllSendKeysTemplate = async (elementFind, text) => {
  if (!text) return
  await selectAllSendKeys(elementFind, text).then(() => {
    return browser.sleep(1000)
  })
  if (await isElementPresent(element(pagina.templateList))) await chooseTemplateList(text)
}

export const chooseTemplate = async (element, text) => {
  if (!text) return
  await element.click().then(() => {
    return chooseTemplateList(text)
  })
}

export const chooseTemplateList = async text => {
  let elementsFound = await getElements(pagina.templateList)
  let elementFound = await getElementText(elementsFound, text, false)
  if (elementFound) {
    await click(elementFound)
  } else {
    await typeKeys('a')
    await pressKey('BACK_SPACE')
  }
}
