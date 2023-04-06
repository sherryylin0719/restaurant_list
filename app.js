// require packages used in the project
const express = require("express")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const Restaurant = require("./models/restaurant")

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
  Restaurant.find()
    .lean()
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  const restaurants = Restaurant.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render("index", { restaurants: restaurants, keyword: keyword })
})

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})