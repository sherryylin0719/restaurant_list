// require packages used in the project
const express = require("express")
const exphbs = require("express-handlebars")
const bodyParser = require('body-parser')
const methodOverride = require("method-override")
const routes = require("./routes")
require("./config/mongoose")

const app = express()

// setting template engine
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(routes)

// setting static files
app.use(express.static("public"))

// start and listen on the Express server
app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})