const express = require('express');
const userRouter = require('./userRouter');
const productRouter = require("./productRouter");
const routerAdmin = express.Router()

routerAdmin.use("/user", userRouter);
routerAdmin.use("/product", productRouter);

module.exports = routerAdmin;