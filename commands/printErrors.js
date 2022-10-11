import getAllErrors from "../utils/getAllErrors"

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
