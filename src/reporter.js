
export function checkResponse(res, status, log = false) {
    console.log(log)
    console.log(status)
    console.log(res)
    
    if (!status) {
        if (log) {
            console.error(JSON.stringify(res))
        } else {
            console.error(JSON.stringify(res))
            // console.error(
            //     "status.....: " + res.status +
            //     "\nerror_code.: " + getErrorCodeMessage(res.error_code) +
            //     "\nerror......: " + res.error +
            //     "\nstatus_text: " + res.status_text +
            //     "\nrequest....: " + res.request.method + " " + res.request.url + "\n"
            // )
        }
    }
}
