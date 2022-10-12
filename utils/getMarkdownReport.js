const getAllErrors = require('./getAllErrors')


function getMarkdownReport(outputJsonFileName) {
    let errors = getAllErrors(outputJsonFileName)
    if (errors.length != 0) {
        const errorsLength = errors.length
        let errorsMarkdown = ``

        errors.forEach(function (error, index) {
            let errorOccurrenceData = ``
            error.requests.forEach(function (request) {
                errorOccurrenceData = errorOccurrenceData + `| ${request.url} | ${request.time} |
`
            })
            
            let title = error.statusText
            if (title == "") {
                title = error.status
            }

            errorsMarkdown = errorsMarkdown + `## [${index + 1}] ${title}

Detailed information about the error:
    
| status          | status text         | body          | error code         | quantity                 |
|:----------------|:--------------------|:--------------|:-------------------|:-------------------------|
| ${error.status} | ${error.statusText} | ${error.body} |${error.errorCode}  | ${error.requests.length} |
    
Error occurrence data:
    
| url | time |
|:----|:-----|
${errorOccurrenceData}`
        })

        return `# Performance Errors Report

Several performance bugs were detected during performance testing. Their list can be found below.

${errorsMarkdown}
## Summary

During performance testing, ${errorsLength} different performance bugs were detected.
    `
    } else {
        return `# Performance Errors Report

Congratulations, no errors detected!
        `
    }
}

module.exports = getMarkdownReport
