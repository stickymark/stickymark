const ScreenshotPlugin = require('./ScreenshotPlugin')

module.exports = (config, params) => {
  return [
    new ScreenshotPlugin(config, params),
  ]
}