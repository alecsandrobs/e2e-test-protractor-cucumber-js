const os = require('os')
const report = require('multiple-cucumber-html-reporter')
const moment = require('moment')
const dataHoraHoje = moment().format('DD/MM/YYYY HH:mm:SS')

module.exports = function (json = 'reports/json-output-folder/', html = 'reports/report') {
  report.generate({
    jsonDir: json,
    reportPath: html,
    pageTitle: 'Plataforma - Resultado dos testes automatizados',
    reportName: 'Plataforma Dev',
    pageFooter: '<div class="created-by"><p><img height="50" width="200" src="../../assets/protractor_logo_3.png"></p></div>',
    displayDuration: true,
    customData: {
      title: 'More info',
      data: [
        { label: 'Built at', value: `${dataHoraHoje}` },
        { label: 'OS', value: `${os.type()} (${os.arch()})` },
        { label: 'Hostname', value: `${os.hostname()}` },
        { label: 'Usuário', value: `${os.userInfo().username}` }
      ]
    }
  })
}
