const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const authConfig = require('../config/auth')

const router = express.Router()

function generateToken (params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

router.post('/register', async (req, res) => {
  const { name } = req.body

  try {
    if (await User.findOne({ name })) {
      return res.status(400).send({ error: 'User already exists' })
    }

    const user = await User.create(req.body)

    return res.send({
      user,
      token: generateToken({ id: user.id })
    })
  } catch (err) {
    return res.status(400).send({ error: 'Registration failed' })
  }
})

router.post('/authenticate', async (req, res) => {
  const { name, password } = req.body

  const user = await User.findOne({ name }).select('+password')

  if (!user) { return res.status(400).send({ error: 'User not found' }) }

  if (!await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'Invalid password' })
  }

  user.password = undefined

  res.send({
    user,
    token: generateToken({ id: user.id })
  })
})

module.exports = app => app.use('/user', router)
