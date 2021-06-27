import { by } from 'protractor'

class Menu {
  constructor () {
    this.menu = by.css('.nav-item')
  }
}

export default Menu
