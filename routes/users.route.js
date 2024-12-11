const express = require('express');
const userRouter = express.Router();
const User = require('../models/users');
const { createUser,loginUser } = require('../controllers/users.controller');

userRouter.post('/register', createUser);
userRouter.post('/login', loginUser);


module.exports = userRouter;
