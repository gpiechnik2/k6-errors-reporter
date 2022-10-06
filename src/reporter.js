const fs = require('fs')
const readEachLineSync = require('read-each-line-sync')
const showdown = require('showdown')


const errorCodes = {
    1000: "A generic error.",
    1010: "A non-TCP network error - this is a place holder there is no error currently known to trigger it.",
    1020: "An invalid URL was specified.",
    1050: "The HTTP request has timed out.",
    1100: "A generic DNS error",
    1101: "No IP for the provided host was found.",
    1110: "Blacklisted IP was resolved or a connection to such was tried to be established.",
    1111: "Blacklisted hostname using The Block Hostnames option.",
    1200: "A generic TCP error.",
    1201: "A 'broken pipe' on write - the other side has likely closed the connection.",
    1202: "An unknown TCP error - We got an error that we don't recognize but it is from the operating system and has errno set on it. The message in error includes the operation(write,read) and the errno, the OS, and the original message of the error.",
    1210: "General TCP dial error.",
    1211: "Dial timeout error - the timeout for the dial was reached.",
    1212: "Dial connection refused - the connection was refused by the other party on dial.",
    1213: "Dial unknown error.",
    1220: "Reset by peer - the connection was reset by the other party, most likely a server.",
    1300: "General TLS error",
    1310: "Unknown authority - the certificate issuer is unknown.",
    1311: "The certificate doesn't match the hostname.",
    "1400to1499": "error codes that correspond to the HTTP 4xx status codes for client errors",
    "1500to1599": "error codes that correspond to the HTTP 5xx status codes for server errors",
    1600: "A generic HTTP/2 error.",
    1610: "A general HTTP/2 GoAway error.",
    "1611to1629": "HTTP/2 GoAway errors with the value of the specific HTTP/2 error code added to 1611.",
    1630: "A general HTTP/2 stream error.",
    "1631to1649": "HTTP/2 stream errors with the value of the specific HTTP/2 error code added to 1631.",
    1650: "A general HTTP/2 connection error.",
    "1651to1669": "HTTP/2 connection errors with the value of the specific HTTP/2 error code added to 1651.",
    1701: "Decompression error."
}

function getErrorCodeMessage(errorCode) {
    if (errorCode in errorCodes) {
        return errorCodes[errorCode]
    } else {
        switch (errorCode) {
            case 1400 <= errorCode <= 1499:
                return errorCodes["1400to1499"]
            case 1500 <= errorCode <= 1599:
                return errorCodes["1500to1599"]
            case 1611 <= errorCode <= 1629:
                return errorCodes["1611to1629"]
            case 1631 <= errorCode <= 1649:
                return errorCodes["1631to1649"]
            case 1651 <= errorCode <= 1669:
                return errorCodes["1651to1669"]
            default:
                return "Unknown error"
        }
    }
}

export function checkResponse(res, status, log = false) {
    if (!status) {
        if (log) {
            console.error(res)
        } else {
            console.error(
                "status.....: " + res.status +
                "\nerror_code.: " + getErrorCodeMessage(res.error_code) +
                "\nerror......: " + res.error +
                "\nstatus_text: " + res.status_text +
                "\nrequest....: " + res.request.method + " " + res.request.url + "\n"
            )
        }
    }
}

export function printAllDetailedErrors(outputJsonFileName) {
    console.log("[k6-errors-reporter] Displaying all detailed errors:\n")
    readEachLineSync(outputJsonFileName, function (line) {
        line = JSON.parse(line)
        if (line.hasOwnProperty("level") && line.hasOwnProperty("msg") && line.hasOwnProperty("source") && line.hasOwnProperty("time") && line["level"] == "error" && line["source"] == "console") {
            line["msg"] = JSON.parse(line["msg"])
            console.log(line)
        }
    });
}

function getAllErrors(outputJsonFileName) {
    const errors = []
    readEachLineSync(outputJsonFileName, function (line) {
        let errorQuantityChanged = false
        line = JSON.parse(line)

        if (line.hasOwnProperty("level") && line.hasOwnProperty("msg") && line.hasOwnProperty("source") && line.hasOwnProperty("time") && line["level"] == "error" && line["source"] == "console") {
            line["msg"] = JSON.parse(line["msg"])
            errors.forEach(error => {

                // if error occured in past
                if (error.status == line.msg.status && error.errorCode == getErrorCodeMessage(line.msg.error_code) && error.error == line.msg.error && error.statusText == line.msg.status_text) {
                    errorQuantityChanged = true
                    error.requests.push({
                        url: line.msg.request.method + " " + line.msg.request.url,
                        time: line.time
                    })
                }
            });
            if (errorQuantityChanged == false) {
                errors.push({
                    status: line.msg.status,
                    errorCode: getErrorCodeMessage(line.msg.error_code),
                    error: line.msg.error,
                    statusText: line.msg.status_text,
                    requests: [{
                        url: line.msg.request.method + " " + line.msg.request.url,
                        time: line.time
                    }],
                })
            }
        }
    })
    return errors
}

export function printAllErrors(outputJsonFileName) {
    console.log("[k6-errors-reporter] Displaying all errors:\n")
    const errors = getAllErrors(outputJsonFileName)
    errors.forEach(function (error, index) {
        const number = index + 1
        console.log(
            "[" + number + "]" +
            "\nstatus.....: " + error.status +
            "\nerror_code.: " + error.errorCode +
            "\nerror......: " + error.error +
            "\nstatus_text: " + error.statusText +
            "\nquantity...: " + error.requests.length +
            "\nrequests...: " + JSON.stringify(error.requests) + "\n"
        )
    })
}

function getMarkdownReport(outputJsonFileName) {
    let errors = getAllErrors(outputJsonFileName)
    if (errors.length != 0) {
        const errorsLength = errors.length        
        let errorsMarkdown = ``

        errors.forEach(function (error, index) {
            let errorOccurrenceData = ``
            error.requests.forEach(function (request) {
                errorOccurrenceData = errorOccurrenceData + `| ${ request.url } | ${ request.time } |
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

export function generateMarkdownReport(outputJsonFileName, reportFileName) {
    const markdownReport = getMarkdownReport(outputJsonFileName)
    converter = new showdown.Converter()
    converter.setOption('tables', true)

    fs.writeFileSync(reportFileName, markdownReport);
    console.log(`[k6-errors-reporter] Markdown report has been successfully generated. Name: ${reportFileName}.`)
}

function getHTMLReport(outputJsonFileName) {
    const markdownReport = getMarkdownReport(outputJsonFileName)
    return `<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="github-markdown.css">
<style>
    * {
        background-color: #0d1117;
        color: #c9d1d9;
    }
        
    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
        color: #c9d1d9;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    }
    
    .markdown-body a {
        background-color: transparent;
        color: #58a6ff;
        text-decoration: none;
    }
        
    .markdown-body p {
        margin-top: 0;
        margin-bottom: 10px;
    }      
   
    .markdown-body h1 {
        margin: .67em 0;
        font-weight: 600;
        padding-bottom: .3em;
        font-size: 2em;
        border-bottom: 1px solid #21262d;
    }
    
    .markdown-body h2 {
        font-weight: 600;
        padding-bottom: .3em;
        font-size: 1.5em;
        border-bottom: 1px solid #21262d;
    }
    
    .markdown-body table th {
        font-weight: 600;
    }
          
    .markdown-body table th,
    .markdown-body table td {
        padding: 6px 13px;
        border: 1px solid #30363d;
    }
          
    .markdown-body table tr {
        background-color: #0d1117;
        border-top: 1px solid #21262d;
    }
          
    .markdown-body table {
        border-spacing: 0;
        border-collapse: collapse;
        display: block;
        width: max-content;
        max-width: 100%;
        overflow: auto;
    }
          
    .markdown-body p,
    .markdown-body table {
        margin-top: 0;
        margin-bottom: 16px;
    }
   
    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>
<article class="markdown-body">

${markdownReport}

</article>
`
}

export function generateHtmlReport(outputJsonFileName, reportFileName) {
    const htmlReport = getHTMLReport(outputJsonFileName)
    converter = new showdown.Converter()
    converter.setOption('tables', true)
    html = converter.makeHtml(htmlReport)

    fs.writeFileSync(reportFileName, html)
    console.log(`[k6-errors-reporter] HTML report has been successfully generated. Name: ${reportFileName}.`)
}
