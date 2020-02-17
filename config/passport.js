const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')

module.exports = passport => {

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: "This email is not registered" })
        }
        if (user.password != password) {
          return done(null, false, { message: 'Email or Password is incorrect'})
        }
       return done(null, user)
      })
    })
  )

  passport.use(
    new FacebookStrategy({
      clientID: '143423503434391',
      clientSecret: '69923e1c6a4f0922467b0166064434da',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      // find and create user
      User.findOne({
        email: profile._json.email
      }).then(user => {
        // 如果 email 不存在就建立新的使用者
        if (!user) {
           // 因為密碼是必填欄位，所以我們可以幫使用者隨機產生一組密碼，然後用 bcrypt 處理，再儲存起來
          var randomPassword = Math.random().toString(36).slice(-8)
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(randomPassword, salt, (err, hash) => {
              var newUser = User({
                name: profile._json.name,
                email: profile._json.email,
                password: hash
              })
              newUser.save().then(user => {
                return done(null, user)
              }).catch(err => {
                console.log(err)
              })
            })
          )
        } else {
          return done(null, user)
        }
      })
    })
  )
  
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}