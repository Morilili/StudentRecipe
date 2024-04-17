const express = require('express')
const userRouter = express.Router();

// Load middleware
const { userprotect } = require("../middleware/auth")
// Load controllers
const { registerUser, loginUser, editUser, deleteUser} = require('../controllers/user')

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.put('/edit/:id', userprotect, editUser)
userRouter.delete('/:id', userprotect, deleteUser)

// userRouter.get('/me', getMe);

module.exports = userRouter;