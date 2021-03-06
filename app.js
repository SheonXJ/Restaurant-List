//Require packages in the project
const express = require('express')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')//Require express-handlebars
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
if (process.env.NODE_ENV !== 'production') { //判別開發環境
  require('dotenv').config()
}

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = process.env.PORT

//Setting template engine
app.engine('handlebars', exphbs({ 
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(handlebars)
}))
app.set('view engine', 'handlebars')
//Setting express-session init
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
//Setting static files
app.use(express.static('public'))
//Setting body-parser 進行前置處理
app.use(express.urlencoded({ extended: true}))
//Setting method-override 路由覆蓋機制
app.use(methodOverride('_method'))
//Setting passport
usePassport(app)
//Setting connect-flash
app.use(flash())
//Setting 設定本地變數
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
// 將 request 導入路由器
app.use(routes)

//Activate and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
