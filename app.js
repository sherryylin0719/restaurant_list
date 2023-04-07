// require packages used in the project
const express = require("express")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const Restaurant = require("./models/restaurant")
const bodyParser = require('body-parser')

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

app.use(bodyParser.urlencoded({ extended: true }))

// setting static files
app.use(express.static("public"))

// routes setting
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

app.get("/ascend", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: "asc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

app.get("/descend", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: "desc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

app.get("/sortByLocation", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ location: "asc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

app.get("/sortByCategory", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ category: "asc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

app.get("/restaurants/new", (req, res) => {
  return res.render("new")
})

app.post("/restaurants", (req, res) => {
  const { name, category, location, phone, description, image, rating } = req.body
  return Restaurant.create({ name, category, location, phone, description, image, rating })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find().lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render("index", { restaurants: filteredRestaurants, keyword: keyword })
    })
})

app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(error => console.log(error))
})

app.post("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id
  const { name, category, location, phone, description, image } = req.body

  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.description = description
      restaurant.image = image
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})