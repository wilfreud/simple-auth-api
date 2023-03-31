const { constants } = require('../constants')

const errorsHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Error", message: err.message })
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message })
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: err.message })
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message })
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message })
        default:
            console.log(statusCode + " No registered error detected in handler. Passing...")
    }


}



module.exports = errorsHandler