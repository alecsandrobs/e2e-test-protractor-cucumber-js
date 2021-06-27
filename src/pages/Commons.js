import { by } from 'protractor'

class Commons {
  constructor () {
    this.teste = by.css('teste')

    this.buttonTitle = title => {
      return by.css(`button[title="${title}"]`)
    }

    this.linkTitle = title => {
      return by.css(`a[title="${title}"]`)
    }
  }
}

export default Commons
