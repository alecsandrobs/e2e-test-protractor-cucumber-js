import { setDefaultTimeout } from 'cucumber'
import { browser } from 'protractor'

export const closeOthersWindows = async () => {
  await browser.getAllWindowHandles().then(handles => {
    if (handles.length > 1) {
      for (let w = handles.length; w > 1; w--) {
        browser.switchTo().window(handles[w - 1])
        browser.driver.close()
      }
      browser.switchTo().window(handles[0])
    }
  })
}

export const goToUrl = async (url, time = 1) => {
  await browser.get(url).then(() => {
    return browser.sleep(time * 1000)
  })
}

export const waitSeconds = async (time = 1) => {
  await browser.sleep(time * 1000)
}

export const waitMinutes = async (time = 1) => {
  await waitSeconds(time * 60)
}

/* eslint-disable */
export const setTimeouts = async (implicitlyWait = 15, pageLoadTimeout = 15, setScriptTimeout = 15, cucumberTimeout = 3600) => {
  setDefaultTimeout(cucumberTimeout * 1000)
  await browser.manage().timeouts().implicitlyWait(implicitlyWait * 1000)
  await browser.manage().timeouts().pageLoadTimeout(pageLoadTimeout * 1000)
  await browser.manage().timeouts().setScriptTimeout(setScriptTimeout * 1000)
}
/* eslint-enable */

export const takeScreenShot = async (step, toTake) => {
  if (!toTake) return
  await browser.takeScreenshot().then(function (img) {
    return step.attach(img, 'image/png')
  })
}

export const writeScenario = async (step, text) => {
  await step.attach(text)
}

// TODO: Is this there any utility?
export const getBrowserLog = async () => {
  await console.log(browser.bpClient)
  await console.log(browser.getSession())
  await console.log(browser.listContexts)
  await console.log(browser.getNetworkConnection)
  await console.log(browser.manage().logs())
  await console.log(browser.manage().timeouts())
  await console.log(browser.getDeviceTime())
  await console.log(browser.getCurrentDeviceActivity())
}
