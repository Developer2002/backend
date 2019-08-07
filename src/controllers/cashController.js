const express = require('express')

const User = require('../models/User')

const authMiddleware = require('../middleware/auth')

const router = express.Router()

router.use(authMiddleware)

router.post('/addcash/:id', async (req, res) => {
  const { qnt } = req.body

  try {
    await User.updateOne(
      { _id: req.params.id },
      { $inc: { cash: qnt } }
    )

    const user = await User.findOne({ _id: req.params.id })

    return res.status(400).send({ cash: user.cash })
  } catch (err) {
    res.status(400).send({ error: 'Add cash failed' })
  }
})

module.exports = app => app.use('/cash', router)
