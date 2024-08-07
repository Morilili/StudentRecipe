const express = require('express')
const userRouter = express.Router();

// Load middleware
const { userprotect, adminprotect } = require("../middleware/auth")
const { removeUser } = require('../middleware/remove')
// Load controllers
const { getUsers, registerUser, loginUser, editUser, logoutUser, deleteUser, getMe, adminVerify} = require('../controllers/user')

userRouter.get('/', adminprotect, getUsers)
userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/me', userprotect, getMe)
userRouter.put('/edit/:id', userprotect, editUser)
userRouter.delete('/:id', userprotect, removeUser ,deleteUser)
userRouter.get('/adminVerify', adminVerify)

module.exports = userRouter;