const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');


router.post('/create', productController.createProduct);
router.get('/list', productController.getAllProducst);
router.put('/update-stock/:id', productController.updateStock);
router.get('/details/:id', productController.productDetails)


module.exports = router;