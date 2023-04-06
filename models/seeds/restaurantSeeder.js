const mongoose = require("mongoose")
const Restaurant = require("../restaurant")
const restaurantList = require("../restaurant.json")
const restaurants = restaurantList.results
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
//connect to mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//connection status
const db = mongoose.connection
db.on("error", () => {
  console.log("mongodb error!")
})
db.once("open", () => {
  console.log("mongodb connected!")
  for (let i = 0; i < restaurants.length; i++) {
    Restaurant.create({
      id: restaurants[i].id,
      name: restaurants[i].name,
      name_en: restaurants[i].name_en,
      category: restaurants[i].category,
      image: restaurants[i].image,
      location: restaurants[i].location,
      phone: restaurants[i].phone,
      google_map: restaurants[i].google_map,
      rating: restaurants[i].rating,
      description: restaurants[i].description,
    })
    console.log("done")
  }
})