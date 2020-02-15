const express = require('express')
const router = express.Router()
const Expense = require('../models/record')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  Expense.find({ userId: req.user._id }).lean().exec((err, expenses) => {
    let total = 0
    for (let i = 0; i < expenses.length; i++) {
      total += expenses[i].expense
    }
    if (err) return console.error(err)
    return res.render('index', { expenses: expenses, total: total })
  })
})

module.exports = router