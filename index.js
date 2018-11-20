const { json } = require('micro')
require('dotenv').config()

const getConfig = require('./lib/config')
const plugins = require('./lib/plugins')

module.exports = async req => {
	const body = await json(req)

	try {
		const config = await getConfig()
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
	} catch (ex) {
		console.log(ex)
		return ex.message
	}
}
