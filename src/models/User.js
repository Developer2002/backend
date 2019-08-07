const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowecase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  cash: {
    type: Number,
    default: 0
  }
})

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

module.exports = mongoose.model('User', UserSchema)
