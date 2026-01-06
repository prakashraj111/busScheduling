const mongoose = require("mongoose")
const Schema = mongoose.Schema

const locationSchema = new Schema({
  placeName: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
}, { _id: false })

const busSchema = new mongoose.Schema({
  busName: {
    type: String,
    required: true
  },
  from: {
    type: locationSchema,
    required: true
  },
  to: {
    type: locationSchema,
    required: true
  },
  path: {
    type: [locationSchema],
    default: []
  },
  image: {
    type: String,
  },
  user_id : {type : Schema.Types.ObjectId, ref : "User"},
// ✅ array of review references
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
})

const Bus = mongoose.model("Bus", busSchema)
module.exports = Bus
