const express = require('express');
const middleware = require('../middleware/middlewares');
const routerAdmin = require('./admin');
const routerUser = require('./user');
const router = express.Router()

router.use("/admin", middleware.authentication ,middleware.authorizationAdmin, routerAdmin);
router.use("/user", middleware.authentication ,middleware.authorizationUser, routerUser);

module.exports = router;