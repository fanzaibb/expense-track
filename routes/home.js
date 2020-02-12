const express = require('express')
const router = express.Router()
const Expense = require('../models/record')

router.get('/', (req, res) => {
  Expense.find().lean().exec((err, expenses) => {
    if (err) return console.error(err)
    console.log(expenses)
    return res.render('index', { expenses: expenses })
  })
})

module.exports = router