const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
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