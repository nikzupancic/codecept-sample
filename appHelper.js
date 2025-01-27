class AppHelper extends Helper {
    async iosOpenCreative(url) {
        const driver = this.helpers.Appium
        await driver.executeScript('mobile:activateApp', { bundleId: 'com.apple.mobilesafari' })
        await driver.waitForVisible('~Safari')

        await driver.amOnPage(url)
        await driver.waitForElement('//XCUIElementTypeButton[@label="Open"]')
        await driver.click('//XCUIElementTypeButton[@label="Open"]')

        await driver.waitForVisible('//XCUIElementTypeOther/XCUIElementTypeWebView')

        await driver.wait(2)
        let contexts = await await driver.grabAllContexts()
        await driver.wait(2)
        contexts = await await driver.grabAllContexts()
        for (const context of contexts.filter((c) => c.id.includes('WEBVIEW'))) {
            if (context.bundleId === 'com.celtra.AdPreview' && !context.url.includes('sdk-core')) {
                console.log(`Switching to ${context.id}`)
                await driver.switchToWeb(context.id)
            }
        }
    }
}

module.exports = AppHelper