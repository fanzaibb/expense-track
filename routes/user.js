const express = require('express')
const router = express.Router()
const User = require('../models/user')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入動作
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    seccessRedirect: '/',
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
  User.findOne({ email: email })
      .then(user => {
        if (user) {
          console.log("User already exists")
          res.render('register', {
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
})

// 登出
router.get('/logout', (req, res) => {
  req.logout() //passport提供的函數，用來消除session
  res.redirect('/user/login')
})

module.exports = router