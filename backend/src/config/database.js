const mongoose = require('mongoose')
const { URI_REMOTO, URI_LOCAL } = require('../../.env')
mongoose.Promise = global.Promise
const URI_TALLOS = 'mongodb://<user>:<senha>@ds033143.mlab.com:33143/db_update'

mongoose.connect(URI_REMOTO, { useNewUrlParser: true })
    .then(_ => console.log(`Database Connected...`))
    .catch(err => console.log(`Error in connection!!! ${err}`))

module.exports = mongoose