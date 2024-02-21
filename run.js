const { Codecept } = require('codeceptjs')


const BROWSERSTACK_USERNAME = ''
const BROWSERSTACK_KEY = ''
const config = {
    platformDomain: 'adcat.test',
    tests: __dirname + 'test.js',
    output: './output',
    bootstrap: () => {},
    teardown: () => {},
    mocha: {},
    plugins: {},
    helpers: {
        WebDriver: {
            url: 'https://test.celtra.com',
            restart: false,
            host: 'hub-cloud.browserstack.com',
            port: 4444,
            waitForTimeout: 5000,
            browser: 'Chrome',
            platform: 'Android',
            desiredCapabilities: {
                'bstack:options': {
                    buildName: 'test-scripting',
                    acceptInsecureCerts: true,
                    networkLogs: true,
                    userName: BROWSERSTACK_USERNAME,
                    accessKey: BROWSERSTACK_KEY,
                    deviceName: 'iPhone 14',
                    osVersion: '16',
                    safariAllowPopups: true
                }
            }
        }
    }
}


  const codecept = new Codecept(config, { steps: true, verbose: true })
  codecept.init(__dirname)
  codecept.loadTests(__dirname + '/webTest.js')
  codecept.run().then(() => console.log('Done'))