import { browser } from 'protractor'
import { isElementPresent, isElementSelected } from './getElement'
import { getElements, getSubelement } from './getElements'
import { consoleLog } from '../util/utils'

export const click = async element => {
  await element.click()
}

export const clickWait = async (element, time = 1) => {
  await click(element)
  await browser.sleep(time * 1000)
}

export const clickCheckBox = async (element, check) => {
  let checked = await isElementSelected(element)
  let option = await check.toUpperCase().substring(0, 1)
  if (((option === 'C' || option === 'M' || option === 'S') && !checked) || ((option === 'D' || option === 'N' || option === 'U') && checked)) {
    await click(element)
  } else {
    if (option !== 'C' && option !== 'M' && option !== 'S' && option !== 'D' && option !== 'N' && option !== 'U') {
      consoleLog(`\tThe option ${check.yellow}`.red, `it is not possible at the moment.`.red)
      consoleLog(`\tIt must be one of those options:`.red)
      consoleLog(`\tThe checkbox is ${checked ? 'checked'.yellow : 'unchecked'.yellow}${'.'.red}`.red)
      if (!checked) {
        consoleLog(`\t\tfor check =>`.red)
        consoleLog(`\t\t\t"C-Check"\n\t\t\t"M-Marcar"\n\t\t\t"S-Sim"`.green)
      } else {
        consoleLog(`\t\tfor uncheck =>`.red)
        consoleLog(`\t\t\t"D-Desmarcar"\n\t\t\t"N-Não"\n\t\t\t"U-Uncheck"`.green)
      }
    }
  }
}

export const clickCheckBoxOnOff = async (elementCheck, elementLabel, check) => {
  let checked = await isElementSelected(elementCheck)
  let option = await check.toUpperCase().substring(0, 1)
  if (((option === 'C' || option === 'M' || option === 'S') && !checked) || ((option === 'D' || option === 'N' || option === 'U') && checked)) {
    await click(elementLabel)
  } else {
    if (option !== 'C' && option !== 'M' && option !== 'S' && option !== 'D' && option !== 'N' && option !== 'U') {
      consoleLog(`\tThe option ${check.yellow}`.red, `it is not possible at the moment.`.red)
      consoleLog(`\tIt must be one of those options:`.red)
      consoleLog(`\tThe checkbox is ${checked ? 'checked'.yellow : 'unchecked'.yellow}${'.'.red}`.red)
      if (!checked) {
        consoleLog(`\t\tfor check =>`.red)
        consoleLog(`\t\t\t"C-Check"\n\t\t\t"M-Marcar"\n\t\t\t"S-Sim"`.green)
      } else {
        consoleLog(`\t\tfor uncheck =>`.red)
        consoleLog(`\t\t\t"D-Desmarcar"\n\t\t\t"N-Não"\n\t\t\t"U-Uncheck"`.green)
      }
    }
  }
}

export const clickExists = async elementFind => {
  if (await isElementPresent(elementFind)) await elementFind.click()
}

export const mouseMoveTo = async (pointX, pointY) => {
  await browser
    .actions()
    .mouseMove({ x: pointX, y: pointY })
    .perform()
}

export const mouseMoveToElement = async elementFound => {
  await browser
    .actions()
    .mouseMove(elementFound)
    .perform()
}

export const dragAndDrop = async (elementStart, elementEnd) => {
  await mouseMoveToElement(elementStart)
  await browser
    .actions()
    .dragAndDrop(elementStart, elementEnd)
    .perform()
}

export const clickElements = async (elementsFind, inverse = false, desconsiderar = 0) => {
  let elementsFound = await getElements(elementsFind)
  let quantidade = await elementsFound.length
  if (quantidade > desconsiderar) {
    if (inverse) {
      for (let d = quantidade; d > desconsiderar; d--) {
        if ((await elementsFound[d - 1].isDisplayed()) && (await elementsFound[d - 1].isEnabled())) await click(elementsFound[d - 1])
      }
    } else {
      for (let c = desconsiderar; c < quantidade; c++) {
        if ((await elementsFound[c].isDisplayed()) && (await elementsFound[c].isEnabled())) await click(elementsFound[c])
      }
    }
  }
}

export const clickSubelements = async (elementsFind, subelementsFind, inverse = false, desconsiderar = 0) => {
  let elementsFound = await getElements(elementsFind)
  let quantidade = await elementsFound.length
  if (quantidade > desconsiderar) {
    if (inverse) {
      for (let d = quantidade; d > desconsiderar; d--) {
        let subelementFound = await getSubelement(elementsFound[d - 1], subelementsFind)
        if ((await subelementFound.isDisplayed()) && (await subelementFound.isEnabled())) await click(subelementFound)
      }
    } else {
      for (let c = desconsiderar; c < quantidade; c++) {
        let subelementFound = await getSubelement(elementsFound[c], subelementsFind)
        if ((await subelementFound.isDisplayed()) && (await subelementFound.isEnabled())) await click(subelementFound)
      }
    }
  }
}
