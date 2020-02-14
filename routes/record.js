const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// 新增一筆紀錄(頁面)
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增一筆紀錄(完成)
router.post('/', (req, res) => {
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    expense: req.body.expense
  })
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 修改一筆紀錄（頁面）
router.get('/update', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    return res.render('update', { record: record })
  })
})

// 修改一筆紀錄（完成）
router.post('/:id/update' ,(req, res) => {
  Record.findById(req.params.id, (err, record) =>{
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
router.post('/:id/delete', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router