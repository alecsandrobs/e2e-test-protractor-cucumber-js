import { by } from 'protractor'

class Pessoas {
  constructor () {
    this.nome = by.model('vm.pessoa.nome')
    this.telefone = by.model('vm.pessoa.telefone')
    this.email = by.model('vm.pessoa.email')
    this.pessoas = by.repeater('item in vm.registros')
  }
}

export default Pessoas
