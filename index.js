#! /usr/bin/env node

const { program } = require('commander')
const generateHtmlReport = require('./commands/generateHtmlReport')
const generateMarkdownReport = require('./commands/generateMarkdownReport')
const printErrors = require('./commands/printErrors')

program
    .command('show-errors <outputLogs>')
    .description('List all detected errors in the console.')
    .action(printErrors)

program
    .command('generate-html-report <outputLogs> <reportName>')
    .description('Generate html report.')
    .action(generateHtmlReport)

program
    .command('generate-markdown-report <outputLogs> <reportName>')
    .description('Generate markdown report.')
    .action(generateMarkdownReport)

program.parse()
