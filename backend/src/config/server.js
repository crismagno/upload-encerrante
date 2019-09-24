const port = 3003
const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./cors'))

app.use(require('./routesUpload'))

app.listen(port, () => console.log(`Backend rodando na porta ${port}`))