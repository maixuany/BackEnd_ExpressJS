const express = require("express");
const router = express.Router();

const authController = require('../controller/userController');

router.post("/register", authController.register);
router.get("/", authController.getAllUser);
router.post("/login", authController.login);

module.exports = router;
