const path = require('path')
const { promisify } = require('util')
const Loader = require('yaml-config-loader')

module.exports = async () => {
  const loader = new Loader({ stopOnError: false })
  loader.on('error', (error) => console.error(error))


  // load default config
  loader.add(path.join(__dirname, '..', 'defaults.config.yml'), { filterKeys: true })

  // layer local config on top
  loader.add(path.join(__dirname, '..', 'config.yml'), { filterKeys: true })

  const promisedLoader = promisify(loader.load)
  return await promisedLoader().then(config => config).catch(error => { throw error })
}
