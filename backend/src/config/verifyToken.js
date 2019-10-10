const jwt = require('jsonwebtoken')
const { authSecret } = require('../../.env')

module.exports = (req, res, next) => {
    // CORS preflight request
    if (req.method === 'OPTIONS') {
        next()
    } else {
        const authHeader = req.headers.authorization || req.body.token
        if (!authHeader) {
            return res.status(401).send('No token provided.')
        }

        const parts = authHeader.split(' ')
        if (!parts.length === 2) {
            return res.status(401).send('Token error.') 
        }

        const [scheme, token] = parts
        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).send('Token malformatted.')
        }

        jwt.verify(token, authSecret, function (err, decoded) {
            if (err) return res.status(401).send('Token invalid!')
               
            req.decoded = decoded
            return next()
        })
    }
}