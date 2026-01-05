const jwt = require("jsonwebtoken")

// const isAuthenticated = async (req,res,next)=>{
//     const token = req.headers.authorization
//     if(!token){
//       return  res.status(403).json({
//             message : "Please login"
//         })
//     }
//     jwt.verify(token,process.env.SECRET_KEY,(err,success)=>{
//         if(err){
//             res.status(400).json({
//                 message : "Invalid Token"
//             })
//         }else{
//             res.status(200).json({
//                 message : "Valid Token"
//             })
//       }
//     })
// }

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: "Please login"
    })
  }

  // Bearer <token>
  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      message: "Token missing"
    })
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid or expired token"
      })
    }

    // 🔥 attach user info to request
    req.user = decoded

    next() // ✅ allow request to continue
  })
}

module.exports = isAuthenticated
