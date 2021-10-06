const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  //Init 'passport' package
  app.use(passport.initialize())
  app.use(passport.session())

  //Setting Local Strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!'})
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email or Password incorrect.'})
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))

  //設定序列化與反序列化
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err,null))
  })
}