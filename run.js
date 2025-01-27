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
        screenshotHelper: {
            require: './screenshotHelper.js'
        },
        AppHelper: {
            require: './appHelper.js'
        },
        // WebDriver or Appium (change to the relevant one)
        WebDriver: {
            // Uncomment if running Appium
            // appiumV2: true,
            // user: BROWSERSTACK_USERNAME,
            // key: BROWSERSTACK_KEY,
            url: 'https://test.celtra.com',
            restart: false,
            host: 'hub-cloud.browserstack.com',
            port: 4444,
            waitForTimeout: 5000,
            // Comment out if running Appium
            browser: 'Safari',
            platform: 'iOS',
            // Uncomment and change to appropriate value if running appium
            // app: 'bs://<app-id>',
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
                // 'appium:fullContextList': true,
                // 'browserstack.acceptInsecureCerts': true,
                // 'browserstack.networkLogs': true,
                // 'browserstack.networkLogsExcludeHosts': [
                //     'googleads.g.doubleclick.net',
                //     'pubads.g.doubleclick.net',
                //     'securepubads.g.doubleclick.net'
                // ],
                // osVersion: '18',
                // platformName: 'iOS',
                // deviceName: 'iPhone 16'
            }
        }
    }
}


  const codecept = new Codecept(config, { steps: true, verbose: true })
  codecept.init(__dirname)
  codecept.loadTests(__dirname + '/test.js')
  codecept.run().then(() => console.log('Done'))