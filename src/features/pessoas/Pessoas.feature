@Pessoas
Feature: Cadastro de pessoas

  Background: Prepara base
    Given não existem pessoas "no cenário"
    And existem pessoas "no cenário"
      | nome                                 | telefone         | email                         |
      | Magnésia Bisurada do Patrocínio      | (88) 9 9898-8989 | magnesia.patrocinio@mail.com  |
      | Manoel Sovaco de Gambar              | (55) 9 9797-7979 | manoel.gambar@gamba.com.br    |
      | Marciano Verdinho das Antenas Longas | 964785123        | marciano.longas@etmail.com.mt |
      | Maria Constança Dores Pança          | 57987654321      | maria.panca@barriga.com.br    |
      | Maria Cristina do Pinto              | (78) 99988-9595  | maria.pinto@email.com         |
      | Sete Chagas de Jesus e Salve Pátria  | 977777777        | setechagas.patria@email.com   |
    And o usuário acessou o ambiente de "Pessoas" "no cenário"

  @PessoasCadastro
  Scenario Outline: Cadastrando pessoa
    Given clicar no botão com o texto "Pessoa"
    And digitar "<nome>" no campo nome da pessoa
    And digitar "<telefone>" no campo telefone da pessoa
    And digitar "<email>" no campo e-mail da pessoa
    And clicar no botão com o texto "Salvar"
    And aguardar 3 segundos
    Then deveria exibir "<nome> <telefone> <email>" na lista de pessoas
    And deveria existir <quantidade> pessoas
    When clicar no botão com o título "Editar" da pessoa "<nome>"
    And aguardar 3 segundos
    # Then deveria exibir "<nome>" no campo nome da pessoa                       # | step falhando pois o protractor não está conseguindo capturar o atributo valor do input |
    # And deveria exibir "<telefone>" no campo telefone da pessoa                # | step falhando pois o protractor não está conseguindo capturar o atributo valor do input |
    # And deveria exibir "<email>" no campo e-mail da pessoa                     # | step falhando pois o protractor não está conseguindo capturar o atributo valor do input |
    And clicar no botão com o texto "Cancelar"

    Examples:
      | nome                    | telefone         | email                       | quantidade |
      | Almir Armando pontes    | (48) 9 9000-0000 | almir.pontes@email.com      | 7          |
      | Maria Joaquina Siqueira | (48) 9 9999-9999 | maria-siqueira@email.com.br | 8          |

  @PessoasEdicao
  Scenario Outline: Editando pessoa
    When clicar no botão com o título "Editar" da pessoa "<pessoaEditar>"
    Then digitar "<nome>" no campo nome da pessoa
    And digitar "<telefone>" no campo telefone da pessoa
    And digitar "<email>" no campo e-mail da pessoa
    And clicar no botão com o texto "Salvar"
    And aguardar 3 segundos
    Then deveria exibir "<nome> <telefone> <email>" na lista de pessoas
    And deveria existir 6 pessoas
    When clicar no botão com o título "Editar" da pessoa "<nome>"
    # Then deveria exibir "<nome>" no campo nome da pessoa                                  # | step falhando pois o protractor não está conseguindo capturar o atributo valor do input |
    # And deveria exibir "<telefone>" no campo telefone da pessoa                           # | step falhando pois o protractor não está conseguindo capturar o atributo valor do input |
    # And deveria exibir "<email>" no campo e-mail da pessoa                                # | step falhando pois o protractor não está conseguindo capturar o atributo valor do input |
    And clicar no botão com o texto "Cancelar"

    Examples:
      | pessoaEditar                         | nome                                         | telefone       | email                              |
      | Marciano Verdinho das Antenas Longas | Etê de Varginha                              | 98 7 6543-2100 | et-varginha@marte.com.br           |
      | Manoel Sovaco de Gambar              | Antonio Manso Pacífico De Oliveira Sossegado | 01234567890    | antonio_sossegado@passifico.com.br |

  @PessoasExclusao @PessoasExclusaoConfirmar
  Scenario Outline: Excluindo pessoa confirmando exclusão
    When clicar no botão com o título "Excluir" da pessoa "<nome>"
    And clicar no botão com o texto "Sim!"
    And aguardar 3 segundos
    Then não deveria exibir "<nome>" na lista de pessoas
    And deveria existir <quantidade> pessoas

    Examples:
      | nome                        | quantidade |
      | Maria Constança Dores Pança | 5          |
      | Manoel Sovaco de Gambar     | 4          |

  @PessoasExclusao @PessoasExclusaoCancelar
  Scenario Outline: Excluindo pessoa cancelando exclusão
    When clicar no botão com o título "Excluir" da pessoa "<nome>"
    And clicar no botão com o texto "Não tenho certeza"
    And aguardar 3 segundos
    Then deveria exibir "<nome>" na lista de pessoas
    And deveria existir <quantidade> pessoas

    Examples:
      | nome                        | quantidade |
      | Maria Constança Dores Pança | 6          |
