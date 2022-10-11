import Showdown from 'showdown'
import fs from 'fs'
import getHTMLReport from '../utils/getHTMLReport'


export function generateHtmlReport(outputJsonFileName, reportFileName) {
    const htmlReport = getHTMLReport(outputJsonFileName)
    converter = new Showdown.Converter()
    converter.setOption('tables', true)
    html = converter.makeHtml(htmlReport)

    fs.writeFileSync (reportFileName, html)
    console.log(`[k6-errors-reporter] HTML report has been successfully generated. Name: ${reportFileName}.`)
}

export default generateHtmlReport
