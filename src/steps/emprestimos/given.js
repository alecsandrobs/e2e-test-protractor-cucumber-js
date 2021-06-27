import { Given } from 'cucumber'
import { deleteServiceAll, postServiceDataTable } from '../../services/services'
import { properties } from '../../util/config'

Given(/^não existem empréstimos "(.*?)"$/, async repete => {
  if (repete.toLowerCase().includes('feature') && !properties.get('featureChanged')) return
  if (repete.toLowerCase().includes('cenário') && !properties.get('scenarioChanged')) return
  await deleteServiceAll(`${properties.get('url')}/emprestimos`)
})

Given(/^existem empréstimos "(.*?)"$/, async (repete, dataTable) => {
  if (repete.toLowerCase().includes('feature') && !properties.get('featureChanged')) return
  if (repete.toLowerCase().includes('cenário') && !properties.get('scenarioChanged')) return
  await postServiceDataTable(`${properties.get('url')}/emprestimos`, dataTable.rawTable)
})
