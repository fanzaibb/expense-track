const express = require('express')
const router = express.Router()
const Expense = require('../models/record')

router.get('/', (req, res) => {
  return res.render('index')
})

module.exports = router