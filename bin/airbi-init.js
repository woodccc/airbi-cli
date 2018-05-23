#!/usr/bin/env node
const program = require('commander')
const path = require('path')
const glob = require('glob')

const go = require('../lib/go')

program.parse(process.argv)
let projectName = program.args[0]

if (!projectName) return program.help()

const directoryList = glob.sync('*')
let rootName = path.basename(process.cwd())

if (directoryList.length) {
	const sameNameWithProjectNameDirectories = directoryList.filter(name => name === projectName)
	if (sameNameWithProjectNameDirectories.length !== 0) return console.log(`项目${projectName}已经存在`)
	
	rootName = projectName
} else if (rootName === projectName) {
	rootName = '.'
} else {
	rootName = projectName
}

go(rootName)
