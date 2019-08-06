const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const CardSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    unique: true,
    required: true
  },
  cardExpires: {
    type: String,
    required: true,
    trim: true
  },
  cardSecure: {
    type: String,
    required: true
  }
})

CardSchema.pre('save', async function (next) {
  const cardNumberHash = await bcrypt.hash(this.cardNumber, 10)
  this.cardNumber = cardNumberHash

  next()
})

module.exports = mongoose.model('Card', CardSchema)
