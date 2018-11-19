const puppeteer = require('puppeteer')

const BasePlugin = require('./BasePlugin')

module.exports = class ScreenshotPlugin extends BasePlugin {
  constructor(config, params) {
    super(config, params)
    this.execute = this.execute.bind(this)
  }

  async execute() {
    try {
      this.updateStatus('start', {
        state: 'success',
        message: `start`,
        step: this.pluginName,
      })

      const { params, config } = this
      const numberViewports = config.screenshot.viewports.length

      for (let i = 0; i < numberViewports; i++) {
        const viewport = config.screenshot.viewports[i]
        await this.captureScreenshot(params.url, viewport)
      }

      this.updateStatus('end', {
        state: 'success',
        message: `end`,
        step: this.pluginName,
      })
    } catch (e) {
      this.updateStatus('error', e)
      return e
    }
  }

  async captureScreenshot(url, viewport) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle2' })
    const title = await page.title()

    await page.setViewport({ width: viewport.width, height: viewport.height })
    await page.waitFor(1000)
    await page.screenshot({ path: `${viewport.width}-${viewport.height}--${title}.png` })
    await browser.close()

    this.updateStatus('update', {
      state: 'success',
      message: `screenshotted ${viewport.width}x${viewport.height} for ${title}`,
      step: this.pluginName,
    })
  }
}
