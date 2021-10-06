const passport = require('passport')
const express = require('express')
const router = express.Router()

const User = require('../../models/user')

router.get('/login',(req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exist!')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        console.log('Register successful!')
        return User.create({
          name,
          email,
          password
        })
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log(err))
      }
    })
})

router.post('/login',passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/users/login',
}))

module.exports = router