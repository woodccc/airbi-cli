#! /usr/bin/env node

const commander = require('commander');
const ora = require('ora');
const inquirer = require('inquirer');
const chalk = require('chalk');
const download = require('download-git-repo');

const log = console.log;
const spinner = ora('Loading unicorns');
const questions = [
	{
		type: 'input',
		name: 'projectName',
		message: 'Please input your project name',
		filter: function(val) {
			return val;
		}
	},
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

commander
	.version('1.0.0')
	.option('-i, --init', 'init a project')

commander
	.command('init')
	.option('-i, --init', 'init a project')
	.action(() => {
		inquirer.prompt(questions).then(answers => {
			const { projectName, type } = answers
			
			spinner.color = 'green';
			spinner.text = 'downloading template……';
			spinner.start()
			
			download(`woodccc/airbi-template-${type}`, projectName, { clone: true }, function(err) {
				if (err) {
					spinner.text = `Error: ${err}`;
					spinner.fail()
				} else {
					const startCmd = projectName === 'frontend' ? 'npm start' : 'npm run dev'
					
					spinner.text = 'download success!';
					spinner.succeed()
					
					log(chalk.white('please run '), chalk.bgBlue(`cd ${projectName} && npm i && ${startCmd}`), chalk.white('to start it'))
					spinner.stop()
				}
			})
		});
	})

commander.parse(process.argv)