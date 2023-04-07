const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/restaurant")

router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

router.get("/search", (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find().lean()
    .then(restaurants => {
      const filteredRestaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render("index", { restaurants: filteredRestaurants, keyword: keyword })
    })
})

router.get("/ascend", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: "asc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

router.get("/descend", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: "desc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

router.get("/sortByLocation", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ location: "asc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

router.get("/sortByCategory", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ category: "asc" })
    .then(restaurants => res.render("index", { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router