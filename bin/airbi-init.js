#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const glob = require('glob')
const inquirer = require('inquirer')
const chalk = require('chalk')

const download = require('../lib/download.js')
const generator = require('../lib/generator.js')

program.parse(process.argv)

// 根据输入，获取项目名称
let projectName = program.args[0]

if (!projectName) {  // project-name 必填
	// 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
	program.help()
	return
}

const list = glob.sync('*')  // 遍历当前目录
let rootName = path.basename(process.cwd())

if (list.length) {  // 如果当前目录不为空
	const sameNameWithProjectNameDirectories = list.filter(name => name === projectName)
	if (sameNameWithProjectNameDirectories.length !== 0) {
		return console.log(`项目${projectName}已经存在`)
	}
	rootName = projectName
} else if (rootName === projectName) {
	rootName = '.'
} else {
	rootName = projectName
}

go()

function go() {
	download(rootName)
		.then(downloadTemplate => {
			const questions = [
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
			inquirer.prompt(questions).then(answers => {
				generator(answers, downloadTemplate, './tmp')
					.then(() =>{
						console.log('# ', chalk.green('Project initialization finished!'))
						console.log('# ========================')
					})
			})
		})
		.catch(err => console.log(err))
}