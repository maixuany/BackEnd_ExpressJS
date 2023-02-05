const express = require('express');
const userRouter = require('./userRouter');
const routerAdmin = express.Router()

routerAdmin.use("/user", userRouter);

module.exports = routerAdmin;