const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const limitter = require('../config/limitter');

// set the limmiter
router.use(limitter)

router.post('/create', categoryController.createCategory);
router.get('/list', categoryController.viewCategory);
router.get('/category-wise-product/:id', categoryController.categoryIdWiseProductData);

module.exports = router;