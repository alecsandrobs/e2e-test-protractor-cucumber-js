require('babel-polyfill')
require('babel-register')

const os = require('os')
const rootDir = process.cwd()
const Reporter = require('./src/util/Reporter')
const moment = require('moment')
const dataHoraHoje = moment().format('DD/MM/YYYY HH:mm:SS')

const isHeadLes = () => {
  return !process.env.HEADLESS || process.env.HEADLESS === 'yes'
}

const cucumberReporteroptions = {
  theme: 'bootstrap',
  noInlineScreenshots: false,
  columnLayout: 1,
  launchReport: false,
  jsonFile: 'reports/emprestimos.json',
  output: 'reports/index.html',
  reportSuiteAsScenarios: false,
  ignoreBadJsonFile: true,
  brandTitle: 'Empréstimos',
  name: `Tests results ${dataHoraHoje}`
}

exports.config = {
  SELENIUM_PROMISE_MANAGER: false,
  ignoreUncaughtExceptions: true,
  directConnect: true,
  getPageTimeout: 30000,
  allScriptsTimeout: 30000,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: isHeadLes() ? ['--headless', '--disable-gpu', '--window-size=1440,900', '--disable-infobars'] : ['--start-maximized', '--disable-infobars']
    },
    metadata: {
      platform: {
        name: process.platform
      },
      device: os.hostname().includes('runner-') ? 'Virtual machine' : 'Local machine'
    }
  },
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  specs: [`${rootDir}/src/features/**/*.feature`],
  cucumberOpts: {
    strict: false,
    require: [`${rootDir}/src/steps/**/*.js`],
    // format: ['json:reports/results.json', 'node_modules/cucumber-pretty'],
    format: [`json:${cucumberReporteroptions.jsonFile}`, 'node_modules/cucumber-pretty'],
    tags: ['~@wip']
  },
  beforeLaunch: function () { },
  onPrepare: function () {
    browser.waitForAngularEnabled(true)
  },
  onComplete: function () {
    Reporter.createHTMLReport(cucumberReporteroptions)
  },
  afterLaunch: function () { },
  plugins: [
    {
      package: require.resolve('protractor-multiple-cucumber-html-reporter-plugin'),
      options: {
        pageTitle: 'Empréstimos - Resultado dos testes automatizados',
        reportName: `Empréstimos - Resultado dos testes automatizados`,
        // pageFooter: '<div class="created-by"><p><img height="50" width="50" src="./assets/protractor_logo_1.png"></p></div>',
        // pageFooter: '<div class="created-by"><p><img height="50" width="50" src="./assets/protractor_logo_2.png"></p></div>',
        pageFooter: '<div class="created-by"><p><img height="50" width="200" src="./assets/protractor_logo_3.png"></p></div>',
        automaticallyGenerateReport: true,
        openReportInBrowser: false,
        displayDuration: true,
        removeExistingJsonReportFile: true,
        removeOriginalJsonReportFile: true,
        customData: {
          title: 'More info',
          data: [
            { label: 'Built at', value: `${dataHoraHoje}` },
            { label: 'OS', value: `${os.type()} (${os.arch()})` },
            { label: 'Hostname', value: `${os.hostname()}` },
            { label: 'Usuário', value: `${os.userInfo().username}` }
          ]
        }
      }
    }
  ]
}
