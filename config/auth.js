module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '登入後才能使用哦！')
    res.redirect('/user/login')
  }
}