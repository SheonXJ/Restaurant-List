// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引用model
const Restaurant = require('../../models/restaurant')

router.get('/:sortType', (req, res) => {
  const sortType = req.params.sortType
  const sort = {}
  switch (sortType) {
    case 'asc':
      sort.name = 'asc'
      break
    case 'desc':
      sort.name = 'desc'
      break
    case 'asc':
      sort.category = 'asc'
      break
    case 'asc':
      sort.location = 'asc'
      break
  }
  Restaurant.find()
    .sort(sort)
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.log(error))
})

module.exports = router