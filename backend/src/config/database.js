const mongoose = require('mongoose')
const { URI_REMOTO, URI_LOCAL } = require('../../.env')
mongoose.Promise = global.Promise

mongoose.connect(URI_REMOTO, { useNewUrlParser: true })
    .then(_ => console.log(`Database Connected...`))
    .catch(err => console.log(`Error in connection!!! ${err}`))

module.exports = mongoose