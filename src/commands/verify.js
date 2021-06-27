import { browser, element } from 'protractor'
import { setTimeouts } from './browser'
import { isElementDisplayed, isElementPresent } from './getElement'

const chai = require('chai').use(require('chai-as-promised'))
const expect = chai.expect

export const waitForElementHaveText = async (elementFound, textExpected, time = 15) => {
  await browser.wait(
    () => {
      return elementFound.getText().then(text => {
        return text.includes(textExpected)
      })
    },
    time * 1000,
    `Aguardar presença do elemento com o texto ${textExpected} por ${time} segundos.`
  )
}

export const waitForElementHaveNoText = async (elementFound, textExpected, time = 15) => {
  await browser.wait(
    () => {
      return elementFound.getText().then(text => {
        return !text.includes(textExpected)
      })
    },
    time * 1000,
    `Aguardar presença do elemento sem o texto ${textExpected} por ${time} segundos.`
  )
}

export const waitForElementPresent = async (elementFound, time = 15, text = `Element not found.`) => {
  await browser.wait(
    () => {
      return elementFound.isPresent().then(present => {
        return present
      })
    },
    time * 1000,
    `${text}\n\t(It waited for ${time} seconds)`.yellow
  )
}

export const waitForElementPresentLength = async (elementsFound, length = 1, time = 15, text = `Elements not found.`) => {
  await browser.wait(
    () => {
      return elementsFound.length === length
    },
    time * 1000,
    `${text}\n\t(It waited for ${time} seconds)`.yellow
  )
}

export const waitForElementNotPresent = async (elementFound, time = 15) => {
  await browser.waitForAngularEnabled(false)
  await setTimeouts(1, 1, 1)
  await browser.wait(
    () => {
      return elementFound.isPresent().then(present => {
        return !present
      })
    },
    time * 1000,
    `Aguardar ausência do elemento por ${time} segundos.`
  )
  await setTimeouts(30, 30, 30)
  await browser.waitForAngularEnabled(true)
}

export const waitForElementVisible = async (elementFound, time = 15) => {
  await browser.wait(
    () => {
      return isElementDisplayed(elementFound)
    },
    time * 1000,
    `Aguardar visibilidade do elemento por ${time} segundos.`
  )
}

export const verifyElementPresent = async elementFound => {
  let present = await isElementPresent(elementFound)
  await verifyTrue(present, 'O elemento não foi encontrado.')
}

export const verifyNoElementPresent = async by => {
  await setTimeouts(1, 1, 1)
  await browser.waitForAngularEnabled(false)
  let present = await isElementPresent(await element(by))
  await verifyFalse(present, `O elemento (${by.toString()}) foi encontrado.`)
  await browser.waitForAngularEnabled(true)
  await setTimeouts(30, 30, 30)
}

export const verifyNoSubelementPresent = async (elementFound, by) => {
  await setTimeouts(1, 1, 1)
  await browser.waitForAngularEnabled(false)
  let present = await isElementPresent(elementFound.element(by))
  await verifyFalse(present, `O subelemento (${by.toString()}) foi encontrado.`)
  await browser.waitForAngularEnabled(true)
  await setTimeouts(30, 30, 30)
}

export const verifyElementNotPresent = async elementFound => {
  await setTimeouts(1, 1, 1)
  await browser.waitForAngularEnabled(false)
  let present = await isElementPresent(elementFound)
  await verifyFalse(present, 'O elemento foi encontrado.')
  await browser.waitForAngularEnabled(true)
  await setTimeouts(30, 30, 30)
}

export const verifyAttribute = async (elementFound, attribute, expected) => {
  await expect(elementFound.getAttribute(attribute)).to.eventually.have.string(expected)
}

export const verifyAttributeValue = async (elementFound, expected) => {
  await verifyAttribute(elementFound, 'value', expected)
}

export const verifyHaveText = async (elementFound, expected) => {
  await expect(elementFound.getText()).to.eventually.have.string(expected)
}

export const verifyHaveNoText = async (elementFound, expected) => {
  await expect(elementFound.getText()).to.eventually.not.have.string(expected)
}

export const verifyElementsLength = async (elementsFound, expected) => {
  await expect(elementsFound).to.eventually.have.lengthOf(expected)
}

export const verifyTrue = async (expeted, text) => {
  await expect(expeted, text).to.be.true
}

export const verifyFalse = async (expeted, text) => {
  await expect(expeted, text).to.be.false
}

export const verifyTextList = async (elementsFound, expected, sort) => {
  if (sort) {
    await verifyHaveText(elementsFound[sort - 1], expected)
  } else {
    let textsFound = await 'em:\n\n'
    let found = await false
    for (let e = 0; e < elementsFound.length; e++) {
      await elementsFound[e].getText().then(textFound => {
        if (textFound.includes(expected)) return (found = true)
        textsFound += `${textFound}\n`
      })
    }
    await verifyTrue(found, `\n=======\nNão encontado o texto "${expected}" ${textsFound}\n=======\n`)
  }
}

export const verifyHaveTextList = async (elementsFound, expected, sort) => {
  if (sort) {
    await verifyHaveText(elementsFound[sort - 1], expected)
  } else {
    let textsFound = await 'em:\n\n'
    let found = await false
    for (let e = 0; e < elementsFound.length; e++) {
      await elementsFound[e].getText().then(textFound => {
        if (textFound.includes(expected)) return (found = true)
        textsFound += `${textFound}\n`
      })
    }
    await verifyTrue(found, `\n=======\nNão encontado o texto "${expected}" ${textsFound}\n=======\n`)
  }
}

export const verifyHaveNoTextList = async (elementsFound, expected, sort) => {
  if (sort) {
    await verifyHaveNoText(elementsFound[sort - 1], expected)
  } else {
    let textsFound = await 'em:\n\n'
    let found = await false
    for (let e = 0; e < elementsFound.length; e++) {
      await elementsFound[e].getText().then(textFound => {
        if (textFound.includes(expected)) {
          textsFound += `${textFound}\n`
          return (found = true)
        } else {
          textsFound += `${textFound}\n`
        }
      })
    }
    await verifyFalse(found, `\n=======\nEncontado o texto "${expected}" não esperado ${textsFound}\n=======\n`)
  }
}

export const verifyTexts = async (elementsFound, expecteds, sort = false) => {
  if (sort) {
    for (let e = 0; e < expecteds.length; e++) {
      await verifyHaveText(elementsFound[e], expecteds[e])
    }
  } else {
    for (let expected of expecteds) {
      await verifyTextList(elementsFound, expected)
    }
  }
}
