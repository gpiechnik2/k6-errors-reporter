import Showdown from 'showdown'
import getMarkdownReport from '../utils/utils'
import fs from 'fs'


function generateMarkdownReport(outputJsonFileName, reportFileName) {
    const markdownReport = getMarkdownReport(outputJsonFileName)
    converter = new Showdown.Converter()
    converter.setOption('tables', true)

    fs.writeFileSync(reportFileName, markdownReport);
    console.log(`[k6-errors-reporter] Markdown report has been successfully generated. Name: ${reportFileName}.`)
}

export default generateMarkdownReport
