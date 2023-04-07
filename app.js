// require packages used in the project
const express = require("express")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const Restaurant = require("./models/restaurant")
const bodyParser = require('body-parser')
const methodOverride = require("method-override")
const routes = require("./routes")

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
app.use(methodOverride("_method"))
app.use(routes)

// setting static files
app.use(express.static("public"))

// routes setting


// start and listen on the Express server
app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})