
Feature('Sample Scenario')

Scenario('This is a test', async ({I}) => {
    I.amOnPage('https://test.celtra.com/preview/f367e9d3')

    I.waitForElement('.ad-placeholder-wrapper')
})