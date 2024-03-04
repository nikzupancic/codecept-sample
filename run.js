const { Codecept } = require('codeceptjs')
const path = require('path')

const BROWSERSTACK_USERNAME = ''
const BROWSERSTACK_KEY = ''


const config = {
    platformDomain: 'adcat.test',
    tests: path.join(__dirname, '*Test.js'),
    output: '/tmp/output',
    bootstrap: () => {},
    teardown: () => {},
    mocha: {},
    plugins: {},
    helpers: {
        Appium: {
            appiumV2: true,
            app: 'bs://da69ab6f053aed844d2969c284294e9724946980',
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
                platformName: 'Android',
                osVersion: '13.0',
                deviceName: 'Samsung Galaxy S23',
            }
        }
    }
}

const codecept = new Codecept(config, { steps: true, verbose: true })
codecept.init(__dirname)
codecept.loadTests(__dirname + '/appTest.js')
codecept.run().then(() => console.log('Done'))