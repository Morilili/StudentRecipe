const express = require('express')
const userRouter = express.Router();

// Load middleware

// Load controllers
const { registerUser, loginUser, editUser, deleteUser} = require('../controllers/user')

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.put('/edit/:id', editUser)
userRouter.delete('/:id', deleteUser)

// userRouter.get('/me', getMe);

module.exports = userRouter;