//Require packages in the project
const express = require('express')
const app = express()
const port = 3000
//Require express-handlebars
const exphbs = require('express-handlebars')
//Require restaurants list
const restaurantList = require('./restaurant.json')

//Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//Setting static files
app.use(express.static('public'))

//Routes setting:index
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
//Routes setting:show list
app.get('/restaurants/:restaurants_id', (req, res) => {
  //如使用Number(),當 req.params.restaurants_id是空字串時,restaurants_id為 0 的餐廳會被錯誤取出來
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurants_id)
  res.render('show', { restaurant: restaurant })
})
//Routes setting:search part
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})


//Activate and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
