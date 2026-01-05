const { registerUser, loginUser } = require("../../controller/auth/authController")

const router = require("express").Router()

// routes here 
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
// router.route("/forgotPassword").post(catchAsync( forgotPassword))
// router.route("/verifyOtp").post(catchAsync(verifyOtp))
// router.route("/resetPassword").post(catchAsync(resetPassword))


module.exports = router 