const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  restaurantList.results.forEach(store => {
    Restaurant.create({
      name: store.name,
      name_en: store.name_en,
      category: store.category,
      image: store.image,
      location: store.location,
      phone: store.phone,
      google_map: store.google_map,
      rating: store.rating,
      description: store.description,
    })
  })

  console.log('done!')
})