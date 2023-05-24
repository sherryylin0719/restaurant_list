const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/restaurant")

router.get("/new", (req, res) => {
  return res.render("new")
})

router.post("/", (req, res) => {
  const userId = req.user._id
  const { name, category, location, phone, description, image, rating } = req.body
  return Restaurant.create({ name, category, location, phone, description, image, rating, userId })
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

router.get("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({_id, userId})
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({_id, userId})
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(error => console.log(error))
})

router.put("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, category, location, phone, description, image } = req.body

  return Restaurant.findOne({_id, userId})
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.description = description
      restaurant.image = image
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

router.delete("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({_id, userId})
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

module.exports = router