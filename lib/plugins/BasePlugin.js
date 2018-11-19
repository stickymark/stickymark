const events = require('events')

module.exports = class BasePlugin extends events.EventEmitter {
  constructor(config, params) {
    super()

    if (this.constructor === BasePlugin) {
      throw new Error('Can\'t instantiate abstract class BasePlugin');
    }

    this.config = config
    this.params = params
    this.pluginName = this.constructor.name

    this.updateStatus = this.updateStatus.bind(this)
  }

  async execute() {
    throw new Error('Base.execute must be implemented by a subclass')
  }

  updateStatus(state, status, context = '') {
    context = context || this.pluginName
    return this.emit(state, context, status)
  }
}
