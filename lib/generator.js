const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const rm = require('rimraf').sync
const chalk = require('chalk')
const _ = require('lodash')

module.exports = function(metadata = {}, source, destination = '.') {
	if (!source) {
		return Promise.reject(new Error(`无效的source：${source}`))
	}
	
	return new Promise((resolve, reject) => {
		Metalsmith(process.cwd())
			.metadata(metadata)
			.clean(false)
			.source(source)
			.destination(destination)
			.use((files, metalsmith, done) => {
				Object.keys(files).forEach(fileName => {
					if (!_.startsWith(fileName, 'src/font')) {
						const fileContentsString = files[fileName].contents.toString()
						files[fileName].contents = new Buffer(Handlebars.compile(fileContentsString)(metalsmith.metadata()))
					}
				})
				done()
			}).build(err => {
				rm('source')
				if (err) {
					console.log(chalk.red(`Metalsmith build error: ${err}`))
					return reject(err)
				} else {
					return resolve()
				}
			})
	})
}
