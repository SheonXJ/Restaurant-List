// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引用model
const Restaurant = require('../../models/restaurant')

router.get('/:sortType/:display', (req, res) => {
  const sortType = req.params.sortType
  const display = req.params.display
  const sort = {}
  switch (sortType) {
    case 'name':
      sort.name = display
      break
    case 'category':
      sort.category = display
      break
    case 'location':
      sort.location = display
      break
  }
  Restaurant.find()
    .sort(sort)
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.log(error))
})

module.exports = router