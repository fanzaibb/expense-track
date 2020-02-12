const express = require('express')
const router = express.Router()
const Expense = require('../models/record')

// 新增一筆紀錄(頁面)
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增一筆紀錄(完成)
router.post('/new', (req, res) => {
  return res.render('index')
})

// 修改一筆紀錄（頁面）
router.get('/:id/edit', (req, res) => {
  return res.render('update')
})

// 修改一筆紀錄（完成）
router.post('/:id/edit' ,(req, res) => {
  return res.render('index')
})

// 刪除紀錄
router.post('/:id/delete', (req, res) => {
  return res.render('index')
})

module.exports = router