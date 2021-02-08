const express = require('express');
const router = express.Router();


const shopController = require('../controllers/shopController');

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/details', shopController.getProductDetail);
router.get('/cart', shopController.getCart);
router.get('/orders', shopController.getOrders);

module.exports = router;