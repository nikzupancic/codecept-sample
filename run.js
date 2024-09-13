const { Codecept } = require('codeceptjs')


const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME
const BROWSERSTACK_KEY = process.env.BROWSERSTACK_KEY

const config = {
    platformDomain: 'adcat.test',
    tests: __dirname + 'test.js',
    output: './output',
    bootstrap: () => {},
    teardown: () => {},
    mocha: {},
    plugins: {},
    helpers: {
        Appium: {
            appiumV2: true,
            // SSL error app
            app: 'nikzupani_p7GImT/sampleSSLError',
            restart: false,
            host: 'hub-cloud.browserstack.com',
            port: 4444,
            waitForTimeout: 5000,
            user: BROWSERSTACK_USERNAME,
            key: BROWSERSTACK_KEY,
            platform: 'Android',
            desiredCapabilities: {
                buildName: 'nik-testing',
                'browserstack.acceptInsecureCerts': true,
                'browserstack.networkLogs': true,
                'browserstack.networkLogsExcludeHosts': ['googleads.g.doubleclick.net', 'pubads.g.doubleclick.net', 'securepubads.g.doubleclick.net'],
                'browserstack.local': true,
                'browserstack.localIdentifier': 'test',
                platformName: 'Android',
                osVersion: '11.0',
                deviceName: 'Samsung Galaxy S21',
            }
        }
    }
}


  const codecept = new Codecept(config, { steps: true, verbose: true })
  codecept.init(__dirname)
  codecept.loadTests(__dirname + '/appTest.js')
  codecept.run().then(() => console.log('Done'))