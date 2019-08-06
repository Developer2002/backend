const express = require('express')

const User = require('../models/User')
const Card = require('../models/Card')

const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.use(authMiddleware)

router.get('/buycard', async (req, res) => {
  const card = await Card.findOne()
  const user = await User.findOne({ id: authMiddleware.userId })

  if (!await card) { return res.status(400).send({ error: 'Empty database' }) }

  if (await user.cash < 25) {
    return res.status(400).send({ error: 'Cash invalid' })
  }

  await user.updateOne(
    {
      $inc: { cash: -25 }
    }
  )

  await Card.findOne({ cardNumber: card.cardNumber }).remove()

  return res.send(card)
})

router.post('/addcard', async (req, res) => {
  try {
    const card = await Card.create(req.body)

    return res.send(card)
  } catch (err) {
    return res.status(400).send({ error: 'Registration failed' })
  }
})

module.exports = app => app.use('/card', router)
