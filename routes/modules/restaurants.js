// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//引用model
const Restaurant = require('../../models/restaurant')

//Routes setting:show restaurant detail page
router.get('/:restaurantsId/detail', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantsId
  Restaurant.findOne({ _id, userId})
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//Routes setting:create page
router.get('/new', (req, res) => {
  res.render('new')
})

//Routes setting:catch create data
router.post('/', (req, res) => {
  const userId = req.user._id
  const {name, name_en, category, image, location, phone, google_map, rating, description } = req.body //解構賦值
  return Restaurant.create({
    name,
    name_en,
    category,
    image: image || "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg",
    location,
    phone,
    google_map,
    rating,
    description,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Routes setting:edit page
router.get('/:restaurantsId/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantsId
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//Routes setting:save edit data
router.put('/:restaurantsId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantsId
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body //解構賦值
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}/detail`))
    .catch(error => console.log(error))
})

//Routes setting: delete restaurant data
router.delete('/:restaurantsId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantsId
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router
