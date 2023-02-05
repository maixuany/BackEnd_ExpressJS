const express = require("express");
const router = express.Router();

const authController = require('../controller/userController');
const middleware = require("./middlewares");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", middleware.authentication, authController.logout);

module.exports = router;
