const readEachLineSync = require('read-each-line-sync')
import getErrorCodeMessage from '../utils/utils'


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

function printErrors(outputJsonFileName) {
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

export default printErrors
