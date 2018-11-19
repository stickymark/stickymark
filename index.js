const { json } = require('micro')
const yaml = require('js-yaml')
const fs = require('fs')
require('dotenv').config()

const plugins = require('./lib/plugins')

module.exports = async req => {
	const body = await json(req)

	try {
		const config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))
		const loadedPlugins = plugins(config, body)

		for (let p = 0; p < loadedPlugins.length; p++) {
			loadedPlugins[p].on('start', (context, status) => console.log(`STARTED ${context}`, status))
			loadedPlugins[p].on('update', (context, status) => console.log(`UPDATED ${context}`, status))
			loadedPlugins[p].on('end', (context, status) => console.log(`ENDED ${context}`, status))
			loadedPlugins[p].on('error', (context, status) => {
				console.log(`ERROR ${context}`, status)
				throw new Error(status)
			})
			await loadedPlugins[p].execute()
		}

		return body.url
	} catch (e) {
		console.log(e)
		return e.message
	}
}