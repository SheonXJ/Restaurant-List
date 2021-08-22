//Require packages in the project
const express = require('express')
const exphbs = require('express-handlebars')//Require express-handlebars
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

//Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//Setting static files
app.use(express.static('public'))
//Setting body-parser 進行前置處理
app.use(express.urlencoded({ extended: true}))
//Setting method-override 路由覆蓋機制
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)

//Activate and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
