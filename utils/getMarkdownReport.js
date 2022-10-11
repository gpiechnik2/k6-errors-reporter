import getAllErrors from "./getAllErrors"

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

            errorsMarkdown = errorsMarkdown + `## [${index + 1}] ${error.error}

Detailed information about the error:
    
| status          | error code         | status text         | quantity                 |
|:----------------|:-------------------|:--------------------|:-------------------------|
| ${error.status} | ${error.errorCode} | ${error.statusText} | ${error.requests.length} |
    
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

export default getMarkdownReport
