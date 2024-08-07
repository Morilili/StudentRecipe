const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usermodels')

const adminprotect = asyncHandler(async(req, res, next) =>{
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
      //get token from header
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //get user from the token
      req.user = await User.findById(decoded.id).select('-password')
      //ensure it is admin
      if (req.user.role == "Admin") next();
      else throw new Error()
    
    } catch(error) {
      console.log(error)
      res.status(401)
      throw new Error("Admin access only")
    }
  }
  if (!token){
    res.status(401)
      throw new Error("Not authorized, no token")
  }
})

const userprotect = asyncHandler(async(req, res, next) =>{
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
      //get token from header
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //get user from the token
      req.user = await User.findById(decoded.id).select('-password')
      next();
    
    } catch(error) {
      console.log(error)
      res.status(401)
      throw new Error("Not Authorised")
    }
  }
  if (!token){
    res.status(401)
      throw new Error("Not authorized, no token")
  }
})

module.exports = { 
  adminprotect,
  userprotect
}