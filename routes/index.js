const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/', homeController.home);
router.use('/category', require('./category'));
router.use('/product', require('./product'));
router.use('/cart', require('./cart'));
router.use('/order', require('./order'));
router.use('/user', require('./user'))

module.exports = router;