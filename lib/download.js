const ora = require('ora');
const inquirer = require('inquirer');
const download = require('download-git-repo');

const spinner = ora()
	
const questions = [
	{
		type: 'list',
		name: 'type',
		message: 'What type do you need?',
		choices: [ 'frontend', 'backend' ],
		filter: function(val) {
			return val.toLowerCase();
		}
	}
]

module.exports = function(targetPath) {
	return new Promise((resolve, reject) => {
		inquirer.prompt(questions).then(answers => {
			const { type } = answers
			
			spinner.color = 'green';
			spinner.text = 'downloading template ……';
			spinner.start()
			
			download(`woodccc/airbi-template-${type}`, targetPath, { clone: true }, function(err) {
				if (err) {
					spinner.text = `Error: ${err}`;
					spinner.fail()
					reject(err)
				} else {
					spinner.text = 'download success!';
					spinner.succeed()
					resolve(targetPath)
				}
			})
		})
	})
}