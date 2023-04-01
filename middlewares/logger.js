
const consoleLogger = (req, res, next) => {
    console.log(`Incoming <${req.method}> request on <${req.originalUrl}> from <${req.ip}>`)
    next()
}


module.exports = consoleLogger