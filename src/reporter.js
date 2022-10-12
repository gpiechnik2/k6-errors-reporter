import getErrorCodeMessage from "../utils/getErrorCodeMessage"

export function checkResponse(res, status, log = false) {
    if (!status) {
        if (log) {
            console.error(res)
        } else {
            console.error(
                "\n  status.....: " + res.status +
                "\n  status.....: " + res.status_text +
                "\n  error_code.: " + getErrorCodeMessage(res.error_code) +
                "\n  body.......: " + res.body +
                "\n  request....: " + res.request.method + " " + res.request.url + " |"
            )
        }
    }
}
