const Bus = require("../../model/busModel")
const Review = require("../../model/reviewModel")

exports.createReview = async (req, res) => {
  const busId = req.params.id
  const { comment, rating } = req.body
  if(!comment || !rating){
    return res.status(400).json({
        message: "Some fields are missing!"
    })
  }
//   console.log(req.user)
  // create review
  const review = await Review.create({
    user_id: req.user.id,
    comment,
    rating
  })

  // push review id into bus
  await Bus.findByIdAndUpdate(
    busId,
    { $push: { reviews: review._id } },
    { new: true }
  )

  res.status(201).json({
    message: "Review added successfully",
    data: review
  })
}

