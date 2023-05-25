const bcrypt = require('bcryptjs')
const { users, restaurants } = require('../data')
const RestaurantModel = require('../restaurant')
const UserModel = require('../user')
const db = require("../../config/mongoose")

db.once('open', () => {
  Promise.all(
    users.map((user, user_index) => {
      // 創建使用者資料(user): model.create
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => UserModel.create({
          name: user.name,
          email: user.email,
          password: hash
        }))
      .then((user) => {
        console.log('user created')
        const userRestaurant = []
        restaurants.forEach((restaurant, rest_index) => {
          if (rest_index >= 3 * user_index && rest_index < 3 * (user_index + 1)) {
            restaurant.userId = user._id
            userRestaurant.push(restaurant)
          }
        })
        // 對每個user建立相對應餐廳資料
        return RestaurantModel.create(userRestaurant)
      })
    })
  ).then(() => {
    // 等待所有使用者的餐廳資料創建完成
    console.log('所有使用者與餐廳資料創建完成')
    process.exit()
  }).catch(error => {
    console.log(error)
  })
})