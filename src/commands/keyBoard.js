import { browser, Key } from 'protractor'

export const sendKeysMulti = async (elementFound, text) => {
  if (text) {
    let objects
    try {
      objects = JSON.parse(text)
      if (typeof objects === 'object') {
        if (Array.isArray(objects)) {
          for (let object of objects) {
            await elementFound.sendKeys(object).then(() => {
              return pressKey('ENTER')
            })
          }
        }
      }
    } catch (error) {
      await elementFound.sendKeys(text).then(() => {
        return pressKey('TAB')
      })
    }
    pressKey('TAB')
  }
}

export const sendKeysAction = async (elementFound, text) => {
  if (!text) return
  if (elementFound) {
    await elementFound
      .actions()
      .sendKeys(text)
      .perform()
  } else {
    await browser
      .actions()
      .sendKeys(text)
      .perform()
  }
}

export const clearSendKeys = async (elementFound, text) => {
  if (text) {
    await elementFound.clear().then(() => {
      elementFound.sendKeys(text)
    })
  }
}

export const selectAllSendKeys = async (elementFound, text) => {
  if (!text) return
  await elementFound.sendKeys(Key.chord(Key.CONTROL, 'a'), text)
}

export const sendkeys = async (elementFound, text) => {
  if (!text) return
  await elementFound.sendKeys(text)
}

export const clear = async elementFound => {
  await elementFound.clear()
}

export const typeKeys = async keys => {
  if (!keys) return
  await browser
    .actions()
    .sendKeys(keys)
    .perform()
}

export const pressKey = async (key, times = 1) => {
  if (!key) return
  for (let t = 0; t < times; t++) {
    await browser
      .actions()
      .sendKeys(Key[key])
      .perform()
  }
}
