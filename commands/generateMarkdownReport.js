const showdown = require('showdown')
const fs = require('fs')
const getMarkdownReport = require('../utils/getMarkdownReport')


function generateMarkdownReport(outputJsonFileName, reportFileName) {
    const markdownReport = getMarkdownReport(outputJsonFileName)
    converter = new showdown.Converter()
    converter.setOption('tables', true)

    fs.writeFileSync(reportFileName, markdownReport);
    console.log(`[k6-errors-reporter] Markdown report has been successfully generated. Name: ${reportFileName}.`)
}

module.exports = generateMarkdownReport
