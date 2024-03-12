require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000
const supportTicketRouter = require('./routes/supportTicket')

app.use(cors())
app.use(express.json())
app.use('/supportTicket', supportTicketRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = app
