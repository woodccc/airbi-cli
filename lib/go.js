const inquirer = require('inquirer')
const chalk = require('chalk')
const cmd = require('node-cmd')

const download = require('./download.js')
const generator = require('./generator.js')

module.exports = function(rootName) {
	download(rootName)
		.then(downloadTemplate => {
			inquirer.prompt(questions(rootName)).then(async(answers) => {
				
				await cmd.get(
					`mkdir ${rootName}`,
					() => {
						generator(answers, downloadTemplate, rootName)
							.then(() =>{
								console.log('')
								console.log('# ', chalk.green('Project initialization finished!'))
								console.log('# ========================')
								console.log('')
								console.log('To get started:')
								console.log(chalk.yellow(`    cd ${rootName}`))
								console.log(chalk.yellow('    npm install'))
								console.log(chalk.yellow('    npm run dev'))
								console.log('')
							})
							.catch(err => console.log(err))
					}
				)
			})
		})
		.catch(err => console.log(err))
}

const questions = (rootName) => {
	return [
		{
			type: 'input',
			name: 'projectName',
			message: 'Project name?',
			default: rootName
		},
		{
			type: 'input',
			name: 'description',
			message: 'Project description?',
			default: 'A air-bi project'
		},
		{
			type: 'input',
			name: 'version',
			message: 'Project version?',
			default: '1.0.0'
		},
	]
}
