// require packages used in the project
const express = require("express")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const restaurantList = require("./restaurant.json")

//use dotenv only when under non-production environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const app = express()

//connect to mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//connection status
const db = mongoose.connection
db.on("error", () => {
  console.log("mongodb error!")
})
db.once("open", () => {
  console.log("mongodb connected!")
})

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

// setting static files
app.use(express.static("public"))

// routes setting
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results })
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render("index", { restaurants: restaurants, keyword: keyword })
})

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render("show", { restaurant, restaurant })
})

// start and listen on the Express server
app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})