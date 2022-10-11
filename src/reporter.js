import getErrorCodeMessage from "../utils/getErrorCodeMessage"

export function checkResponse(res, status, log = false) {
    if (!status) {
        if (log) {
            console.error(res)
        } else {
            console.error(
                "\n  status.....: " + res.status +
                "\n  error_code.: " + getErrorCodeMessage(res.error_code) +
                "\n  error......: " + res.error +
                "\n  status_text: " + res.status_text +
                "\n  request....: " + res.request.method + " " + res.request.url +
                "\n "
            )
        }
    }
}
