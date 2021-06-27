import { by } from 'protractor'

class Emprestimos {
  constructor () {
    this.codigo = by.model('vm.emprestimo.codigo')
    this.tipo = by.model('vm.emprestimo.tipo')
    this.tipos = by.options('itemTipo.value as itemTipo.label for itemTipo in vm.tipos track by itemTipo.value')
    this.dataEmprestimo = by.model('vm.emprestimo.dataEmprestimo')
    this.situacao = by.model('vm.emprestimo.situacao')
    this.situacoes = by.options('itemSituacao.value as itemSituacao.label for itemSituacao in vm.situacoes track by itemSituacao.value')
    this.dataDevolucao = by.model('vm.emprestimo.dataDevolucao')
    this.pessoa = by.model('vm.emprestimo.pessoa')
    this.pessoas = by.repeater('item in pesVm.registros')
    this.observacoes = by.model('vm.emprestimo.observacoes')
    this.emprestimosList = by.repeater('item in vm.registros')

    this.itemCodigo = by.model('vm.item.codigo')
    this.itemDescricao = by.model('vm.item.descricao')
    this.itemQuantidade = by.model('vm.item.quantidade')
    this.itemPreco = by.model('vm.item.valor')
    this.itemsList = by.repeater('item in vm.emprestimo.itens')
  }
}

export default Emprestimos
