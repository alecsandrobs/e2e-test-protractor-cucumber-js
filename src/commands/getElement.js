import { verifyTrue } from './verify'

export const isElementDisplayed = async elementFind => {
  let elementDisplayed = false
  await elementFind.isDisplayed().then(displayed => {
    return (elementDisplayed = displayed)
  })
  return elementDisplayed
}

export const isElementEnabled = async elementFind => {
  let elementEnabled = false
  await elementFind.isEnabled().then(enabled => {
    return (elementEnabled = enabled)
  })
  return elementEnabled
}

export const isElementPresent = async elementFind => {
  let elementPresent = false
  await elementFind.isPresent().then(present => {
    return (elementPresent = present)
  })
  return elementPresent
}

export const isElementSelected = async elementFind => {
  let elementSelected = false
  await elementFind.isSelected().then(selected => {
    return (elementSelected = selected)
  })
  return elementSelected
}

export const isSubelementPresent = async (elementFound, findBy) => {
  let elementPresent = false
  await elementFound
    .element(findBy)
    .isPresent()
    .then(present => {
      return (elementPresent = present)
    })
  return elementPresent
}

export const getText = async elementFound => {
  let textFound = await elementFound.getText().then(text => {
    return text || ''
  })
  return textFound
}
export const getAttribute = async (elementFound, attribute) => {
  let textFound = await elementFound.getAttribute(attribute).then(text => {
    return text || ''
  })
  return textFound
}
export const getAttributeValue = async elementFound => {
  await getAttribute(elementFound, 'value')
}

export const getElementText = async (elementsFound, text, failOnNotFind = true) => {
  let found = false
  let elementTarget
  let textsFound = await 'em:\n\n'
  for (const elementFound of elementsFound) {
    await elementFound.getText().then(textFound => {
      if (textFound.includes(text)) {
        found = true
        return (elementTarget = elementFound)
      } else {
        textsFound += `${textFound}\n`
      }
    })
  }
  if (elementTarget) {
    return elementTarget
  } else {
    return failOnNotFind ? verifyTrue(found, `\n=======\nNão encontado o texto "${text}" ${textsFound}\n=======\n`) : undefined
  }
}

export const getElementAttribute = async (elementsFound, text, attribute = 'title', failOnNotFind = true) => {
  let found = false
  let elementTarget
  let textsFound = await 'em:\n\n'
  for (const elementFound of elementsFound) {
    await elementFound.getAttribute(attribute).then(textFound => {
      if (textFound.includes(text)) {
        found = true
        return (elementTarget = elementFound)
      } else {
        textsFound += `${textFound}\n`
      }
    })
  }
  if (elementTarget) {
    return elementTarget
  } else {
    return failOnNotFind ? verifyTrue(found, `\n=======\nNão encontrado o texto "${text}" ${textsFound}\n=======\n`) : undefined
  }
}
