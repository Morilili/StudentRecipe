const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require("../models/usermodels")
// Generate JWT 
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
}

// look more into access


//@desc Register new user
//@route POST api/users
const registerUser = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password){
    res.status(400)
    throw new Error("Please enter all fields")
  }
  //check if user exist
  const userExist = await User.findOne({email})
  if (userExist){
    res.status(400)
    throw new Error("User already exist")
  }

  //hash password
  const salt = await bcrypt.genSalt()
  const hashedpass = await bcrypt.hash(password, salt)

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedpass,
  })

  if (user){
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error ("User data not valid")
  }
})

//@desc Authenticate a user
//@route POST api/users/login
const loginUser = asyncHandler ( async (req, res) => {
  const { email, password } = req.body

  //check if user exist
  const user = await User.findOne({email})

  if (user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error ("Invalid Credentials")
  }
})

//@desc Edit user details
//@route PUT api/users/edit/:id
const editUser = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id)
  const { name, password } = req.body

  // if (!req.user){
  //   res.status(401)
  //   throw new Error("User not found")
  // }

  if (!name && !password){
    res.status(400)
    throw new Error("Enter information")
  } else {
    const updatedname = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  }
})

//@desc delete user
//@route DELETE api/users/:id
const deleteUser = asyncHandler(async(req,res) => {
  const user = await User.findById(req.params.id)

  if (!user){
    res.status(401)
    throw new Error("User not found")
  } else {
    const name = user.name
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({success: true, message: `Successfully deleted user ${name}`})
  }
})



// //@desc Get user
// //@route POST api/users/me
// const getMe = asyncHandler(async (req, res) => {
//   const {_id, name, email} = await User.findById(req.user.id)

//   res.status(200).json(req.user)
// })


module.exports = {
  registerUser, 
  loginUser,
  // getMe,
  editUser,
  deleteUser
}