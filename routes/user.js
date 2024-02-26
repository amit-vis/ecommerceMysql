const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const limitter = require('../config/limitter');

// set the limmiter
router.use(limitter)

router.post('/create', userController.create);
router.post('/signin', userController.signIn);

module.exports = router;