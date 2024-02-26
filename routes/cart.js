const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const passport = require('passport');
const limitter = require('../config/limitter');

// set the limmiter
router.use(limitter)

router.post('/add-cart/:id',passport.authenticate('jwt', {session: false}), cartController.addCart);
router.get('/cart-list',passport.authenticate('jwt', {session: false}), cartController.allItemCart);
router.delete('/delete-Item/:id',passport.authenticate('jwt', {session: false}), cartController.removeItem)

module.exports = router;