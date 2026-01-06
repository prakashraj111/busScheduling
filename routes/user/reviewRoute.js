const { createReview } = require("../../controller/user/reviewController")
const isAuthenticated = require("../../middleware/isAuthenticated")

const router = require("express").Router()

// routes here 
router.route("/bus/:id/review").post(isAuthenticated,createReview)
// router.route('/bus/:id/review/:id').delete()

module.exports = router 