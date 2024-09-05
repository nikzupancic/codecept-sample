const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const Helper = require('codeceptjs').helper

class ScreenshotHelper extends Helper {

    async cropScaledImageArea(imageBuffer, scaleFactor, elementRect) {
        const elementPosition = {
            x: 0 + (elementRect.x * 3),
            y: 177 + 0 + (elementRect.y) * 3,
        }
        const devicePixelRatio = 3

        const scaledArea = {
            x: elementPosition.x + ((elementRect.width * devicePixelRatio) * (1 - scaleFactor)) / 2,
            y: elementPosition.y + ((elementRect.height * devicePixelRatio) * (1 - scaleFactor)) / 2,
            width: elementRect.width * scaleFactor * devicePixelRatio,
            height: elementRect.height * scaleFactor * devicePixelRatio
        }

        return await sharp(imageBuffer).extract({
            top: Math.round(scaledArea.y),
            left: Math.round(scaledArea.x),
            width: Math.round(scaledArea.width),
            height: Math.round(scaledArea.height) }).toBuffer()
    }

    async captureCroppedImage(elementRect, scaleFactor) {
        const driver = this.helpers.WebDriver || this.helpers.Appium
        const platform = 'iOS'
        const buffer = await driver.saveScreenshot(path.join(__dirname, platform + 'Tmp.png'))

        return this.cropScaledImageArea(buffer, scaleFactor, elementRect)
    }

    async getReferenceImage(filePath) {
        const refImg = sharp(fs.readFileSync(filePath))
        const refBuffer = await refImg.raw().toBuffer()
        const refMetadata = await refImg.metadata()

        if (!refMetadata?.width || !refMetadata?.height) {
            throw new Error(`Could not get metadata for reference image: ${filePath}`)
        }

        return { buffer: refBuffer, width: refMetadata.width, height: refMetadata.height }
    }

    async compareImageUntilTimeout(elementRect, fileName, referenceBuffer,
        imageWidth, imageHeight, timeout, scaleFactor = 1, tolerance = 0.1) {
        const pixelmatch = (await import('pixelmatch')).default
        const diffImage = Buffer.alloc(imageWidth * imageHeight * 4)
        const startTime = Date.now()
        const retry = await import('ts-retry-promise')
        let currentImage

        try {
            await retry.retry(async () => {
                try {
                    currentImage = await this.captureCroppedImage(elementRect, scaleFactor)
                    // Threshold is computed as (allowed threshold) / 255
                    // 0.1 means that each RGB component can be off by max 25.5 compared to reference values
                    const pixelDifference = pixelmatch(referenceBuffer, await sharp(currentImage).ensureAlpha().raw().toBuffer(), diffImage,
                        imageWidth, imageHeight, { threshold: tolerance })
                    if (pixelDifference) {
                        // We need to differentiate between erorrs when pixelmatch fails and when capturing image fails already
                        throw new Error('currentImage, pixelDifference')
                    }
                } catch (err) {
                    throw err
                }
            }, { timeout: 7500, retries: 'INFINITELY', delay: 0 })
        } catch (err) {
            await sharp(currentImage).toFile('cropped.png')
            throw err
        }
    }


    async seeVideoImage(videoPlayerElement, { r, g, b }, timeout = 5, shouldWait = true,
        tolerance = 0.3, scaleFactor = 0.5) {
        // More tolerant comparison method used mainly to verify that videos are playing (1 color changes to the next one)
        // It accepts a video selector and narrows that area further based on scaleFactor variable (0.5 means that it takes half
        // of original area in the center of the player). It compares it to a buffer which is created on the fly instead of using
        // pre-made reference images and contains a single color passed as RGB parameter to this function. It is also more tolerant
        // by default but that can be adjusted with tolerance parameter.
        const driver = this.helpers.WebDriver || this.helpers.Appium

        const playerRect = await driver.grabElementBoundingRect(videoPlayerElement)
        const scaledWidth = Math.round(playerRect.width * 3 * scaleFactor)
        const scaledHeight = Math.round(playerRect.height * 3 * scaleFactor)

        // Use sharp to create a buffer filled with single color
        const singleColorBuffer = await sharp({
            create: {
                width: scaledWidth,
                height: scaledHeight,
                channels: 4,
                background: { r, g, b, alpha: 1 }
            }
        }).raw().toBuffer()

        const timestamp = Date.now()
        await this.compareImageUntilTimeout(playerRect, 'videoImage', singleColorBuffer,
            scaledWidth, scaledHeight, timeout, scaleFactor, tolerance)
        const timeTaken = (Date.now() - timestamp) / 1000
        if (timeout - timeTaken > 0 && shouldWait) {
            await driver.wait(timeout - timeTaken)
        }
    }
}

module.exports = ScreenshotHelper
