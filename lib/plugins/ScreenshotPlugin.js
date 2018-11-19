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

      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      const { params, config } = this

      await page.goto(params.url, { waitUntil: 'networkidle2' })
      const title = await page.title()

      for (let i = 0; i < config.screenshot.viewports.length; i++) {
        const viewport = config.screenshot.viewports[i]
        await page.setViewport({ width: viewport.width, height: viewport.height })
        await page.waitFor(2000)
        await page.screenshot({ path: `${viewport.width}-${viewport.height}--${title}.png` })

        this.updateStatus('update', {
          state: 'success',
          message: `screenshotted ${viewport.width}x${viewport.height} for ${title}`,
          step: this.pluginName,
        })
      }

      this.updateStatus('end', {
        state: 'success',
        message: `end - ${title}`,
        step: this.pluginName,
      })
    } catch (e) {
      this.updateStatus('error', e)
      return e
    }
  }
}
