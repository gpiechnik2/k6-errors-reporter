import getErrorCodeMessage from "../utils/getErrorCodeMessage"

export function checkResponse(res, status, log = false) {
    console.log(log)
    console.log(status)
    
    if (!status) {
        console.log("://")
        if (log) {
            console.log(":))")
            console.error(res)
        } else {
            console.log("gucci")
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
