// require packages used in the project
const express = require("express")
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require("express-handlebars")
const bodyParser = require('body-parser')
const methodOverride = require("method-override")
const flash = require('connect-flash') 
const routes = require("./routes")
require("./config/mongoose")
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

// setting template engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))


app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg') 
  next()
})

// setting static files
app.use(express.static("public"))
app.use(routes)

// start and listen on the Express server
app.listen(process.env.PORT, () => {
  console.log(`Express is listening on localhost:${process.env.PORT}`)
})