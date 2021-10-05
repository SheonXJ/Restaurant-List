// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入模組程式碼
// 將網址結構符合字串的 request 導向模組 
const home = require('./modules/home')
router.use('/', home)

const restaurants = require('./modules/restaurants')
router.use('/restaurants', restaurants)

const search = require('./modules/search')
router.use('/search', search)

const sort = require('./modules/sort')
router.use('/sort', sort)

const users = require('./modules/users')
router.use('/users', users)

// 匯出路由器
module.exports = router