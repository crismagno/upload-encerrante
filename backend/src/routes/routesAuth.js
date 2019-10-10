const routes = require('express').Router()
const { signIn, signUp, validateToken } = require('../api/auth/auth')

routes.post('/signIn', signIn)
routes.post('/signUp', signUp)
routes.post('/validateToken', validateToken)

module.exports = routes