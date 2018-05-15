#! /usr/bin/env node

const commander = require('commander');
const ora = require('ora');
const inquirer = require('inquirer');
const chalk = require('chalk');
const download = require('download-git-repo');
const cmd = require('node-cmd');

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
inquirer.prompt(questions).then(answers => {
	const { projectName, type } = answers
	
	spinner.color = 'green';
	spinner.text = 'downloading template……';
	spinner.start()
	
	download(`woodccc/airbi-template-${type}`, projectName, { clone: true }, function(err) {
		if (err) {
			log(chalk.red(`Error: ${err}`))
			spinner.stop()
		} else {
			log('')
			log(chalk.green('success!'))
			log(chalk.white('please run '), chalk.green(`cd ${projectName} && npm i && npm start`), chalk.white('to start it'))
			spinner.stop()
		}
	})
});

commander
	.version('1.0.0')
	.option('-i, --init', 'init a project')

commander
	.command('init')
	.option('-i, --init', 'init a project')
	.action(() => {
	
	})

commander.parse(process.argv)