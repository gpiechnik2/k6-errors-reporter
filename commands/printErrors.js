const getAllErrors = require("../utils/getAllErrors")


function printErrors(outputJsonFileName) {
    console.log("[k6-errors-reporter] Displaying all errors:\n")
    const errors = getAllErrors(outputJsonFileName)
    errors.forEach(function (error, index) {
        console.log(
            "[" + index + "] Error found" +
            "\nstatus.....: " + error.status +
            "\nstatus_text: " + error.statusText +
            "\nerror_code.: " + error.errorCode +
            "\nbody.......: " + error.body +
            "\nquantity...: " + error.requests.length +
            "\nrequests...: " + JSON.stringify(error.requests) + "\n"
        )
    })
}

module.exports = printErrors
