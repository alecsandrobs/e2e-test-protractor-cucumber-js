import { by } from 'protractor'

class CalculadoraAposentadoria {
  constructor () {
    this.valor = by.model('vm.desejado')
    this.anos = by.model('vm.anos')
    this.taxa = by.model('vm.taxa')

    this.investimento = by.binding('vm.resultado')
  }
}

export default CalculadoraAposentadoria
