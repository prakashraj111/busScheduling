const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
         type: String,
         unique: true,
         required: true
    },
    password: {
        type: String,
         required: true
    },
    address : String,
    contactNo: Number,
    role: {
        type : String,
        enum : ["user","driver","admin"],
        default : "user",
    }
})

const User = mongoose.model("User",userSchema)
module.exports = User