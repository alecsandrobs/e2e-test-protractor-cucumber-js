import { by } from 'protractor'

class CalculadoraSalario {
  constructor () {
    this.nome = by.model('vm.nome')
    this.salario = by.model('vm.salarioBruto')
    this.dissidio = by.model('vm.outrosProventos')
    this.dependentes = by.model('vm.quantidadeDependentes')
    this.auxilios = by.model('vm.auxilios')
    this.descontos = by.model('vm.descontos')

    this.salarioBruto = by.binding('vm.salarioResultado')
    this.inss = by.binding('vm.inss')
    this.irrf = by.binding('vm.irrf')
    this.descontoEmpresa = by.binding('vm.impostoEmpresa')
    this.salarioLiquido = by.binding('vm.salarioLiquido')
    this.salarioSemImpostos = by.binding('vm.salarioSemIpostos')
  }
}

export default CalculadoraSalario
