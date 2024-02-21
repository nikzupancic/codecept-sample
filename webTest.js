
Feature('Testing scenario')

Scenario('Open new tab', ({ I }) => {
    I.amOnPage('http://qatestwebpage.celtra-test.com//?tag=4da4f670e2a74b2131734647c876aaf5&automation=true')
    I.waitForVisible('.notranslate iframe')
    I.switchTo('.notranslate iframe')

    I.waitForVisible('[data-object-name="open-website-button"]')
    I.click('[data-object-name="open-website-button"]')
    I.wait(5)
})

Scenario('Following test', ({ I }) => {
    I.amOnPage('https://qatestwebpage.celtra-test.com/')
    I.waitForText('Test page')
    I.waitForVisible('[name="code"]')
})
