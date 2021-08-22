//Require packages in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')//Require express-handlebars
const methodOverride = require('method-override')
const mongoose = require('mongoose')//Require mongoose
const Restaurant = require('./models/restaurant.js')

//Setting database
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//Setting static files
app.use(express.static('public'))
//Setting body-parser 進行前置處理
app.use(express.urlencoded({ extended: true}))
//Setting method-override 路由覆蓋機制
app.use(methodOverride('_method'))


//Routes setting:index
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})
//Routes setting:show restaurant detail page
app.get('/restaurants/:restaurantsId/detail', (req, res) => {
  const id = req.params.restaurantsId
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})
//Routes setting:search part
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const keywordRegex = new RegExp(keyword, 'i')
  // const restaurants = restaurantList.results.filter(restaurant => {
  //   return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  // })
  // res.render('index', { restaurants: restaurants, keyword: keyword })
  return Restaurant.find({ name: { $regex: keywordRegex}})
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})
//Routes setting:create page
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
//Routes setting:catch create data
app.post('/restaurants', (req, res) => {
const restaurant = req.body
return Restaurant.create({
  name: restaurant.name,
  name_en: restaurant.name_en,
  category: restaurant.category,
  image: restaurant.image || "https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5635/01.jpg",
  location: restaurant.location,
  phone: restaurant.phone,
  google_map: restaurant.google_map,
  rating: restaurant.rating,
  description: restaurant.description,
  })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})
//Routes setting:edit page
app.get('/restaurants/:restaurantsId/edit', (req, res) => {
  const id = req.params.restaurantsId
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', {restaurant}))
    .catch(error => console.log(error))
})
//Routes setting:save edit data
app.put('/restaurants/:restaurantsId', (req, res) => {
  const id = req.params.restaurantsId
  const restaurantEdit = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = restaurantEdit.name
      restaurant.name_en = restaurantEdit.name_en
      restaurant.category = restaurantEdit.category
      restaurant.image = restaurantEdit.image
      restaurant.location = restaurantEdit.location
      restaurant.phone = restaurantEdit.phone
      restaurant.google_map = restaurantEdit.google_map
      restaurant.rating = restaurantEdit.rating
      restaurant.description = restaurantEdit.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/detail`))
    .catch(error => console.log(error))
})
//Routes setting: delete restaurant data
app.delete('/restaurants/:restaurantsId', (req, res) => {
  const id = req.params.restaurantsId
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Activate and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
