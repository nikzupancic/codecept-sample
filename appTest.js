Feature('App')

Scenario('SSL error', async ({ I }) => {
    const tag = Buffer.from('<iframe src="https://browserstack-local.test:4443/index.html"/>').toString('base64')

    I.amOnPage(`app-preview-celtra.com://preview?tag=${encodeURIComponent(tag)}&tagType=HTML&layout=I&size=undefined&sdk=dfp`)

    I.waitForElement('#com.celtra.adpreview:id/bt_showInterstitial', 10)
    I.click('#com.celtra.adpreview:id/bt_showInterstitial')
    I.wait(2)
    I.waitForVisible('//android.webkit.WebView')
    I.switchToWeb('WEBVIEW_com.celtra.adpreview')
})
