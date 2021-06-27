@Emprestimos
Feature: Cadastro de empréstimos

  Background: Prepara base
    Given não existem empréstimos "no cenário"
    And não existem pessoas "na feature"
    And existem pessoas "na feature"
      | nome                                 | telefone         | email                         |
      | Magnésia Bisurada do Patrocínio      | (88) 9 9898-8989 | magnesia.patrocinio@mail.com  |
      | Manoel Sovaco de Gambar              | (55) 9 9797-7979 | manoel.gambar@gamba.com.br    |
      | Marciano Verdinho das Antenas Longas | 964785123        | marciano.longas@etmail.com.mt |
      | Maria Constança Dores Pança          | 57987654321      | maria.panca@barriga.com.br    |
      | Maria Cristina do Pinto              | (78) 99988-9595  | maria.pinto@email.com         |
      | Sete Chagas de Jesus e Salve Pátria  | 977777777        | setechagas.patria@email.com   |
    And o usuário acessou o ambiente de "Empréstimos" "no cenário"

  @EmprestimosCadastro
  Scenario Outline: Cadastrando empréstimo
    When clicar no botão com o texto "Empréstimo"
    And selecionar "<tipo>" no campo tipo do empréstimo
    And digitar "<dataEmprestimo>" no campo data do empréstimo
    And selecionar "<situacao>" no campo situação do empréstimo
    And digitar "<dataDevolucao>" no campo data de devolução do empréstimo
    And selecionar "<pessoa>" no campo pessoa do empréstimo
    And digitar "<observacoes>" no campo observações do empréstimo
    And adicionar os itens no empréstimos "<itensAdicionar>"
    Then deveria existir <itensQuantidade> itens do empréstimo
    And deveria exibir "<itens>" na lista de itens do empréstimo
    And deveria exibir "<itens>" na linha 1 da lista de itens do empréstimo
    When clicar no botão com o texto "Salvar"
    And aguardar 3 segundos
    Then deveria existir <emprestimosQuantidade> empréstimos
    And deveria exibir "<emprestimo>" na lista de empréstimos
    And deveria exibir "<emprestimo>" na linha <linhaEmprestimo> da lista de empréstimos
    When clicar no botão com o título "Editar" do empréstimo "<emprestimo>"
    And deveria exibir "<tipo>" no campo tipo do empréstimo
    # And deveria exibir "<dataEmprestimo>" no campo data do empréstimo                      # | step falhando pois o protractor não está conseguindo capturar o atributo valor do input |
    And deveria exibir "<situacao>" no campo situação do empréstimo
    # And deveria exibir "<dataDevolucao>" no campo data de devolução do empréstimo          # | step falhando pois o protractor não está conseguindo capturar o atributo valor do input |
    And deveria exibir "<pessoa>" no campo pessoa do empréstimo
    # And deveria exibir "<observacoes>" no campo observações do empréstimo                  # | step falhando pois o protractor não está conseguindo capturar o atributo valor do input |
    Then deveria existir <itensQuantidade> itens do empréstimo
    And deveria exibir "<itens>" na lista de itens do empréstimo
    And deveria exibir "<itens>" na linha 1 da lista de itens do empréstimo
    # And deveria exibir "<itensAdicionar>" nos campos itens no empréstimos                  # | step falhando pois o protractor não está conseguindo capturar o atributo valor do input |
    And aguardar 1 segundos
    And clicar no botão com o texto "Cancelar"

    Examples:
      | tipo      | dataEmprestimo  | situacao   | dataDevolucao   | pessoa                  | observacoes                                          | itensAdicionar                                                                                                                                                                                                                                                         | itensQuantidade | itens                                      | emprestimosQuantidade | emprestimo                    | linhaEmprestimo |
      | Concedido | @currentDate()  | Emprestado | @currentDate(7) | Maria Cristina do Pinto | Empréstimo concedido no domingo tem custo adicional. | [{"codigo":"1","descricao":"Caixa de som JBL Flip 4","quantidade":"1","preco":"20"},{"codigo":"2","descricao":"Fone de ouvido bluetooth JBL","quantidade":"1","preco":"15"},{"codigo":"3","descricao":"Kit mouse e teclado sem fio","quantidade":"2","preco":"12.25"}] | 3               | 1 Caixa de som JBL Flip 4 1,00 20,00 20,00 | 1                     | 00:00 Maria Cristina do Pinto | 1               |
      | Recebido  | @currentDate(1) | Devolvido  | @currentDate(1) | Manoel Sovaco de Gambar | Empréstimo recebido para devolução no mesmo dia.     | [{"codigo":"1","descricao":"Apple Ipad 6","quantidade":"1","preco":"35.5"},{"codigo":"2","descricao":"Smartband","quantidade":"1","preco":"4.5"}]                                                                                                                      | 2               | 1 Apple Ipad 6 1,00 35,50 35,50            | 2                     | 00:00 Manoel Sovaco de Gambar | 2               |

  @EmprestimosEdicao @wip
  Scenario Outline: Editando empréstimo
    Given existem empréstimos "no cenário"
      | tipo      | dataEmprestimo           | situacao   | dataDevolucao            | pessoa                                                     | observacoes                           | itens                                                                                    |
      | CONCEDIDO | 2019-06-03T03:00:00.000Z | EMPRESTADO | 2019-06-07T03:00:00.000Z | @getPessoa(nome like 'Maria Cristina do Pinto'):data.0._id | Empréstimo concedido no dia seguinte. | @array(@object({"codigo":"1","descricao":"Laptop Samsung","quantidade":1,"valor":35.5})) |
    # When clicar no botão com o título "Editar" do empréstimo "<emprestimoEditar>"

    Examples:
      | emprestimoEditar                     | nome            | telefone       | email                    |
      | Marciano Verdinho das Antenas Longas | Etê de Varginha | 98 7 6543-2100 | et-varginha@marte.com.br |

  @EmprestimosExclusao @EmprestimosExclusaoConfirmar @wip
  Scenario Outline: Excluindo pessoa confirmando exclusão
    And existem empréstimos "no cenário"
      | tipo      | dataEmprestimo           | situacao   | dataDevolucao            | pessoa                                                     | observacoes                           | itens                                                                                    |
      | CONCEDIDO | 2019-06-03T03:00:00.000Z | EMPRESTADO | 2019-06-07T03:00:00.000Z | @getPessoa(nome like 'Maria Cristina do Pinto'):data.0._id | Empréstimo concedido no dia seguinte. | @array(@object({"codigo":"1","descricao":"Laptop Samsung","quantidade":1,"valor":35.5})) |
    When clicar no botão com o título "Excluir" do empréstimo "<nome>"
    And clicar no botão com o texto "Sim!"
    And aguardar 3 segundos
    Then não deveria exibir "<nome>" na lista de pessoas
    And deveria existir <quantidade> pessoas

    Examples:
      | nome                        | quantidade |
      | Maria Constança Dores Pança | 5          |
      | Manoel Sovaco de Gambar     | 4          |

  @EmprestimosExclusao @EmprestimosExclusaoCancelar @wip
  Scenario Outline: Excluindo pessoa cancelando exclusão
    And existem empréstimos "no cenário"
      | tipo      | dataEmprestimo           | situacao   | dataDevolucao            | pessoa                                                         | observacoes                           | itens                                                                                    |
      | CONCEDIDO | 2019-06-03T03:00:00.000Z | EMPRESTADO | 2019-06-07T03:00:00.000Z | @getPessoa(@object({"nome": "Maria Cristina do Pinto"})):0._id | Empréstimo concedido no dia seguinte. | @array(@object({"codigo":"1","descricao":"Laptop Samsung","quantidade":1,"valor":35.5})) |
    When clicar no botão com o título "Excluir" do empréstimo "<nome>"
    And clicar no botão com o texto "Não tenho certeza"
    And aguardar 3 segundos
    Then deveria exibir "<nome>" na lista de pessoas
    And deveria existir <quantidade> pessoas

    Examples:
      | nome                        | quantidade |
      | Maria Constança Dores Pança | 6          |
