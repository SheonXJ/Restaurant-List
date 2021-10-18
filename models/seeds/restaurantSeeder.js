const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'User1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantListIndex: [0, 1, 2]
  },
  {
    name: 'User2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantListIndex: [3, 4, 5]
  },
]

db.once('open', () => {
  Promise.all(
    SEED_USER.map(SEED_USER => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          const userRestaurantList = SEED_USER.restaurantListIndex.map(i => {
            restaurantList[i].userId = userId
            return restaurantList[i]
          })
          return Restaurant.create(userRestaurantList)
        })
    })
  )
  .then(() => {
    console.log('done!')
    process.exit()
  })
  .catch(err => console.log(err))
})
