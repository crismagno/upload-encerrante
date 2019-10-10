const routes = require('express').Router()
const verifyToken = require('../config/verifyToken')

const { getEncerrantes, postEncerrante, putDone, deleteEncerrante } = 
    require('../api/encerrantes/encerrantes_controler')

// routes.use(verifyToken)
routes.get('/upload',verifyToken, getEncerrantes)
routes.post('/upload',verifyToken, postEncerrante)
routes.put('/upload/done/:id',verifyToken, putDone)
routes.delete('/upload/:id/:name',verifyToken, deleteEncerrante)

module.exports = routes