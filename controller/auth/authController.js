const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../model/userModel")

exports.registerUser = async(req,res)=>{
    const {userName,email,password,address,contactNo} = req.body
    if(!email || !password || !contactNo || !userName || !address){
       return res.status(400).json({
            message : "Please provide email,password,phoneNumber"
        })
    }
    // check if that email user already exist or not
   const userFound =  await User.find({userEmail : email})
    if(userFound.length > 0 ){
        return res.status(400).json({
            message : "User with that email already registered",
            data : []
        })
    }

    // else 
    const userData = await User.create({
        userName : userName,
        email : email,
        address: address,
        contactNo : contactNo,
        password : bcrypt.hashSync(password,10)
    })

      // 🔑 AUTO LOGIN (JWT)
    const token = jwt.sign(
      { id: userData._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    )

    res.status(201).json({
        message : "User registered successfully",
        token,
    data: {
      id: userFound._id,
      userName: userFound.userName,
      email: userFound.email
    }
      
    })
}


exports.loginUser = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            message : "Please provide email,password"
        })
    }

    // check if that email user exists or not
    const userFound = await User.find({email : email})
    if(userFound.length == 0){
        return res.status(404).json({
            message : "User with that email is not Registered"
        })
    }

 
    // password check 
    const isMatched = bcrypt.compareSync(password,userFound[0].password)
    if(isMatched){
        // generate token 
       const token = jwt.sign({id : userFound[0]._id},process.env.SECRET_KEY,{
        expiresIn : '30d'
       })


        res.status(200).json({
            message : "User logged in successfully",
           data :  userFound,
           token : token
        })
    }else{
        res.status(400).json({
            message : "Invalid Password"
        })
    }
    
}