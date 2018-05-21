const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const rm = require('rimraf').sync

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
					const fileContentsString = files[fileName].contents.toString()
					files[fileName].contents = new Buffer(Handlebars.compile(fileContentsString)(metalsmith.metadata()))
				})
				done()
			}).build(err => {
			rm(source)
			err ? reject(err) : resolve()
		})
	})
}
