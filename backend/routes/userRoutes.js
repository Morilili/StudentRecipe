const express = require('express')
const userRouter = express.Router();

// Load middleware
const { userprotect } = require("../middleware/auth")
// Load controllers
const { registerUser, loginUser, editUser, logoutUser, deleteUser, getMe} = require('../controllers/user')

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/me', userprotect, getMe)
userRouter.put('/edit/:id', userprotect, editUser)
userRouter.delete('/:id', userprotect, deleteUser)

module.exports = userRouter;