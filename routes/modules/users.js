const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get("/login", (req, res) => {
  res.render("login")
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true,
}))
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: "Email has already been registered" })
    }
    if ( !email || !password || !confirmPassword) {
      errors.push({ message: "All columns are required" })
    }
    if (password !== confirmPassword) {
      errors.push({ message: "Password doesn't match with Confirm Password" })
    }
    if (errors.length) {
      return res.render("register", {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      // 如果還沒註冊：寫入資料庫
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})
module.exports = router