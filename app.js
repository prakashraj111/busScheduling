const express = require("express")
const app = express()
const { connectDatabase } = require("./database")
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
// telling nodejs to give access to uploads folder 
app.use(express.static("./uploads"))
//ROUTES HERE
const authRoute = require("./routes/auth/authRoute")
const userRoute = require("./routes/user/userRoute")
const reviewRoute = require("./routes/user/reviewRoute")

connectDatabase(process.env.MONGO_URI)

//Api here
app.use("",authRoute)
app.use("",userRoute)
app.use("",reviewRoute)

app.listen(process.env.PORT, (req, res)=>{
    console.log(`Server is Listening to the PORT ${process.env.PORT}`)
})