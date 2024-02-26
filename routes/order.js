const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const passport = require('passport');
const limitter = require('../config/limitter');

// set the limmiter
router.use(limitter)

router.post('/place-order/:id',passport.authenticate('jwt', {session: false}), orderController.placeOrder);
router.get('/order-history',passport.authenticate('jwt', {session: false}), orderController.orderHistory);
router.get('/order-details/:id',passport.authenticate('jwt', {session: false}), orderController.orderDetails)


module.exports = router;