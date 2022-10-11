const showdown = require('showdown')
const fs = require('fs')
const getHTMLReport = require('../utils/getHTMLReport')


function generateHtmlReport(outputJsonFileName, reportFileName) {
    const htmlReport = getHTMLReport(outputJsonFileName)
    converter = new showdown.Converter()
    converter.setOption('tables', true)
    html = converter.makeHtml(htmlReport)

    fs.writeFileSync (reportFileName, html)
    console.log(`[k6-errors-reporter] HTML report has been successfully generated. Name: ${reportFileName}.`)
}

module.exports = generateHtmlReport
