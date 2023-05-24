const mongoose = require("mongoose")
//use dotenv only when under non-production environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

//connect to mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

//connection status
const db = mongoose.connection
db.on("error", () => {
  console.log("mongodb error!")
})
db.once("open", () => {
  console.log("mongodb connected!")
})