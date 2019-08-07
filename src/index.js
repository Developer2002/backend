const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')

const app = express()

mongoose.connect(
  process.env.MONGOOSE_URL,
  {
    useNewUrlParser: true
  }
)
app.use(express.urlencoded())
app.use(express.json())

require('./controllers/authController')(app)
require('./controllers/cardController')(app)
require('./controllers/cashController')(app)

app.listen(process.env.PORT || 3333)
