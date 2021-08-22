// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引用model
const Restaurant = require('../../models/restaurant')

//Routes setting:index
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
