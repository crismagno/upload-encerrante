const mongoose = require('mongoose')
mongoose.Promise = global.Promise
// mongoose.set('useCreateIndex', true);
const { URI_REMOTO, URI_LOCAL } = require('../../.env')
const URI_TALLOS = 'mongodb://tallos:tallos123@ds033143.mlab.com:33143/db_update'

mongoose.connect(URI_REMOTO, { useCreateIndex: true, useNewUrlParser: true })
    .then(_ => console.log(`Database Connected...`))
    .catch(err => console.log(`Error in connection!!! ${err}`))

module.exports = mongoose 