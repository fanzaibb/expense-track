const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')

// 新增一筆紀錄(頁面)
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 新增一筆紀錄(完成)
router.post('/', authenticated, (req, res) => {
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    expense: req.body.expense,
    userId: req.user._id
  })
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 修改一筆紀錄（頁面）
router.get('/:id/update', authenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user.id }, 
    (err, record) => {
      console.log(record)
      if (err) return console.error(err)
      return res.render('update', { record: record })
  })
})

// 修改一筆紀錄（完成）
router.post('/:id/update', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user.id }, (err, record) =>{
    if (err) return console.error(err)
    record.name = req.body.name
    record.date = req.body.date
    record.category = req.body.category
    record.expense = req.body.expense
    record.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// 刪除紀錄
router.post('/:id/delete', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user.id }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router