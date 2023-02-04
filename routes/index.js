const express = require('express')
const router = express.Router()

const authRouter = require('../middleware/routes')

router.use('/auth', authRouter);

module.exports = router;