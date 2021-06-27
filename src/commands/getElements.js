import { replaceAll } from '../util/utils'
import { element, $$, by } from 'protractor'

export const getElements = async findBy => {
  let elementsFound = await element.all(findBy).then(elements => {
    return elements
  })
  return elementsFound
}

export const getSubelements = async (elementFounnd, findBy) => {
  let elementsFound = await elementFounnd.all(findBy).then(elements => {
    return elements
  })
  return elementsFound
}

export const getElements$$ = async findBy => {
  let elementsFound = await $$(findBy).then(elements => {
    return elements
  })
  return elementsFound
}

export const getElementsCssContainingText = async (findBy, text) => {
  let elementsFound = await element.all(by.cssContainingText(findBy, text)).then(elements => {
    return elements
  })
  return elementsFound
}

export const getSubelements$$ = async (elementFound, findBy) => {
  let elementsFound = await elementFound.$$(findBy).then(elements => {
    return elements
  })
  return elementsFound
}

export const getElement = async (findBy, sort = 1) => {
  let elementsFound = await element.all(findBy).then(elements => {
    return elements
  })
  return elementsFound[sort - 1]
}

export const getElement$$ = async (findBy, sort = 1) => {
  let elementsFound = await $$(findBy).then(elements => {
    return elements
  })
  return elementsFound[sort - 1]
}

export const getSubelement = async (elementFound, findBy, sort = 1) => {
  let elementsFound = await elementFound.all(findBy).then(elements => {
    return elements
  })
  return elementsFound[sort - 1]
}

export const getSubelement$$ = async (elementFound, findBy, sort = 1) => {
  let elementsFound = await elementFound.$$(findBy).then(elements => {
    return elements
  })
  return elementsFound[sort - 1]
}

export const getElementsLength = async findBy => {
  let elementsLength = await element.all(findBy).then(elements => {
    return elements.length ? elements.length : 0
  })
  return elementsLength
}

export const getSubelementsLength = async (elementFounnd, findBy) => {
  let elementsLength = await elementFounnd.all(findBy).then(elements => {
    return elements.length ? elements.length : 0
  })
  return elementsLength
}

export const getElementsTextList = async elementsFound => {
  for (let e = 0; e < elementsFound.length; e++) {
    await elementsFound[e].getText().then(text => {
      let sort = e + 1
      return console.log(replaceAll(`${sort < 10 ? '0' + sort.toString() : sort}º - ${text}`, '\n', '{¬}'))
    })
  }
}

export const getElementsAttributeList = async (elementsFind, attribute = 'value') => {
  for (let e = 0; e < elementsFind.length; e++) {
    await elementsFind[e].getAttribute(attribute).then(text => {
      let sort = e + 1
      return console.log(replaceAll(`${sort < 10 ? '0' + sort.toString() : sort}º - ${text}`, '\n', '{¬}'))
    })
  }
}

export const getElementsDisplayedList = async elementsFound => {
  for (let e = 0; e < elementsFound.length; e++) {
    await elementsFound[e].isDisplayed().then(displayed => {
      let text = `O ${e + 1}º elemento está ${displayed ? 'visível' : 'invisível'}`
      return console.log(displayed ? text.green : text.red)
    })
  }
}

export const getElementsEnabledList = async elementsFind => {
  for (let e = 0; e < elementsFind.length; e++) {
    await elementsFind[e].isEnabled().then(enabled => {
      let text = `O ${e + 1}º elemento está ${enabled ? 'habilitado' : 'desabilitado'}`
      return console.log(enabled ? text.green : text.red)
    })
  }
}

export const getElementsSelectedList = async elementsFind => {
  for (let e = 0; e < elementsFind.length; e++) {
    await elementsFind[e].isSelected().then(enabled => {
      let text = `O ${e + 1}º elemento ${enabled ? 'está' : 'não está'} selecionado`
      return console.log(enabled ? text.green : text.red)
    })
  }
}
