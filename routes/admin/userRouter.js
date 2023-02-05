const express = require('express');
const userController = require('../../controller/userController');
const userRouter = express.Router()

userRouter.get("/", userController.getAllUser);
userRouter.post("/", userController.addNewAdmin);

module.exports = userRouter;