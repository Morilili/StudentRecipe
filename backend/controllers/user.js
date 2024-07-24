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
const registerUser = asyncHandler(async(req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password){
    res.status(400).json({message: "Please enter all fields"})
    next(new Error("Please enter all fields"))
  }
  //check if user exist
  const userExist = await User.findOne({email})
  if (userExist){
    res.status(400).json({message: "User already exists"})
    next(new Error("User already exists"))
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
      status: "success",
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
      message: "User created"
    })
  } else {
    res.status(400).json({message: "User data not valid"})
    next(new Error("User data not valid"))
  }
})

//@desc Authenticate a user
//@route POST api/users/login
const loginUser = asyncHandler ( async (req, res, next) => {
  const { email, password } = req.body

  //check if user exist
  const user = await User.findOne({email})

  if (user && (await bcrypt.compare(password, user.password))){
    // quite ugly for nested if loops but too lazy to change currently
    if(user.role === 'Admin'){
      res.status(200).json({
        status: "success",
        data: {
          _id: user.id,
          name: user.name,
          role: "Admin",
          token: generateToken(user._id)
        },
        message: "Admin Login Success",
      })
    } else {
      res.status(200).json({
        status: "success",
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id)
        },
        message: "Login Success",
      })
    }
  } else {
    res.status(400).json({message: "Invalid credential"})
    next(new Error("Invalid Credentials"))
  }
})

//@desc Ensuring the user within admin dashboard is an admin
//@route GET api/users/adminVerify
const adminVerify = asyncHandler(async (req, res, next) => {
  try {
    // Extract token from header
    // console.log(req.user)
    
    const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token
  
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    
    // Fetch user from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is an admin
    if (user.role === 'Admin') {
      res.status(200).json({
        status: "success",
        data: true,
        message: 'Admin verification Successful'
      })
    } else {
      return res.status(403).json({ message: "Not authorized as an admin" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

//@desc Authenticate a user
//@route POST api/users/logout
const logoutUser = asyncHandler( async(req,res) => {
  res.status(200).json({
      status: "success",
      data: null,
      message: 'Logout Successful'
  }) 
})

//@desc Edit user details
//@route PUT api/users/edit/:id
const editUser = asyncHandler(async(req, res, next) => {
  const user = await User.findById(req.params.id)
  const { name, password } = req.body

  if (!user){
    res.status(401).send({message: "User not found"})
    next(new Error("User not found"))
  }

  if (req.body.password){
    const salt = await bcrypt.genSalt()
    const hashedpass = await bcrypt.hash(password, salt)
    req.body.password = hashedpass
  }

  if (name == '' && password == ''){
    res.status(400).send({message: "Enter information"})
    next(new Error("Enter information"))
  } else if (name  == '') {
    delete req.body.name
  } else if (password == '') {
    delete req.body.password
  }

  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json({
    status: "success",
    data: {
      _id: updated.id,
      name: updated.name,
      email: updated.email,
      token: generateToken(updated._id)
    }, 
    message: "Updated user information"
  });
})

//@desc delete user
//@route DELETE api/users/:id
const deleteUser = asyncHandler(async(req,res) => {
  const user = await User.findById(req.params.id)

  if (!user){
    res.status(401).send({message: "User not found"})
    next(new Error("User not found"))
  } else {

    const name = user.name
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: "success", 
      data: null,
      message: `Successfully deleted user ${name}`
    })
  }
})

// //@desc Get user
// //@route POST api/users/me
const getMe = asyncHandler(async (req, res) => {
  const {_id, name, email} = await User.findById(req.user.id)
  res.status(200).json({
    status: "success",
    data: req.user,
    message: "Get me success"
  })
})


module.exports = {
  registerUser, 
  loginUser,
  getMe,
  adminVerify,
  editUser,
  deleteUser,
  logoutUser
}