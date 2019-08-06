const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0-wkslz.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
)
app.use(express.urlencoded())
app.use(express.json())

require('./controllers/authController')(app)
require('./controllers/cardController')(app)
require('./controllers/dataController')(app)

app.listen(process.env.PORT || 3333)
