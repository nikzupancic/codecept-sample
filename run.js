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
                    build: 'test-scripting',
                    acceptSslCert: true,
                    'browserstack.networkLogs': true,
                    'browserstack.user': BROWSERSTACK_USERNAME,
                    'browserstack.key': BROWSERSTACK_KEY,
                    os_version: '13.0',
                    device: 'Samsung Galaxy S23',
                    platform: 'Android',
                    'browserstack.local': false,
            }
        }
    }
}


  const codecept = new Codecept(config, { steps: true, verbose: true })
  codecept.init(__dirname)
  codecept.loadTests(__dirname + '/webTest.js')
  codecept.run().then(() => console.log('Done'))