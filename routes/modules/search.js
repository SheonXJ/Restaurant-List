// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引用model
const Restaurant = require('../../models/restaurant')

//Routes setting:search part
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const keywordRegex = new RegExp(keyword, 'i')
  // const restaurants = restaurantList.results.filter(restaurant => {
  //   return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  // })
  // res.render('index', { restaurants: restaurants, keyword: keyword })
  return Restaurant.find({ name: { $regex: keywordRegex } })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
