const jwt = require('jsonwebtoken')


const validateToken = (req, res, next) => {
    let token
    let authHeaders = req.headers.Authorization || req.headers.authorization

    // Check if authHeaader statrts well
    if (authHeaders && authHeaders.startsWith('Bearer')) {
        token = authHeaders.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ "error": "User is not authorized" })
            }

            req.user = decoded.user
            next()
        })
    }

    if (!token) {
        res.status(401).json({ "error": "Invalid token or user unauthorized" })
    }
}

module.exports = validateToken