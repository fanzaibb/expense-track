const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入動作
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login'
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊動作
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body

  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填'})
  }

  if (password !== password2) {
    errors.push({ message: '輸入的密碼不一致'})
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ email: email })
        .then(user => {
          if (user) {
            errors.push({ message:'此Email已被使用者註冊'})
            res.render('register', {
              errors,
              name,
              email,
              password,
              password2
            })
          } else {
            const newUser = new User ({
              name,
              email,
              password
            })
            newUser.save().then(user => {
              res.redirect('/')
            }).catch(err => console.log(err))
          }
        })
  }
})

// 登出
router.get('/logout', (req, res) => {
  req.logout() //passport提供的函數，用來消除session
  res.flash('success_msg', '你已成功登出～')
  res.redirect('/user/login')
})

module.exports = router