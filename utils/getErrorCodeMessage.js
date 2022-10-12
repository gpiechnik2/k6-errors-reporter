const errorCodes = require("./errorCodes")


function getErrorCodeMessage(errorCode) {
    if (errorCode in errorCodes) {
        return errorCodes[errorCode]
    } else {
        switch (true) {
            case (1400 <= errorCode && errorCode <= 1499):
                return errorCodes["1400to1499"]
            case (1500 <= errorCode && errorCode <= 1599):
                return errorCodes["1500to1599"]
            case (1611 <= errorCode && errorCode <= 1629):
                return errorCodes["1611to1629"]
            case (1631 <= errorCode && errorCode <= 1649):
                return errorCodes["1631to1649"]
            case (1651 <= errorCode && errorCode <= 1669):
                return errorCodes["1651to1669"]
            default:
                return "Unknown error"
        }
    }
}

module.exports = getErrorCodeMessage
