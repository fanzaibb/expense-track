const express = require('express')
const router = express.Router()
const Expense = require('../models/record')
const { authenticated } = require('../config/auth')
const moment = require('moment')

router.get('/', authenticated, (req, res) => { 
  Expense
  .find({ userId: req.user._id })//確認登入後會傳入包含user資訊的req，找資料中有同組userId的資料
  .lean()
  .exec((err, expenses) => { //.exec()->mongoose查詢query的方法

    // 類別篩選
    let sort = req.query.inputCategory || ""
    if ( sort !== "" && sort !== "all") {
      expenses = expenses.filter(record => {
        return record.category.includes(sort)
      })
    }
    
    let total = 0
    for (let i = 0; i < expenses.length; i++) {

      // 總金額 
      total += expenses[i].expense

      // 轉換時間
      expenses[i].date = moment(expenses[i].date).format('YYYY-MM-DD')
      
      // 判斷資料類別
      if (expenses[i].category === "house") {
        expenses.cateHouse = true
      } else if (expenses[i].category === "trans") {
        expenses[i].cateTrans = true
      } else if (expenses[i].category === "leisure") {
        expenses[i].cateLeisure = true
      } else if (expenses[i].category === "food") {
        expenses[i].cateFood = true
      } else {
        expenses[i].cateOthers = true
      }

    }
    if (err) return console.error(err)
    return res.render('index', { expenses: expenses, total: total })
  })
})

module.exports = router