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
                    osVersion: '13.0',
                    deviceName: 'Samsung Galaxy S23',
                    local: false,
                }
                // When running Appium instead of WebDriver use following capabilities for W3C:
                // buildName: 'test-scripting',
                // 'browserstack.acceptInsecureCerts': true,
                // 'browserstack.networkLogs': true,
                // 'browserstack.userName': BROWSERSTACK_USERNAME,
                // 'browserstack.accessKey': BROWSERSTACK_KEY,
                // 'browserstack.networkLogsExcludeHosts': [
                //     'googleads.g.doubleclick.net',
                //     'pubads.g.doubleclick.net',
                //     'securepubads.g.doubleclick.net'
                // ],
                // osVersion: '13.0',
                // platformName: 'Android',
                // deviceName: 'Samsung Galaxy S23'
            }
        }
    }
}


  const codecept = new Codecept(config, { steps: true, verbose: true })
  codecept.init(__dirname)
  codecept.loadTests(__dirname + '/webTest.js')
  codecept.run().then(() => console.log('Done'))