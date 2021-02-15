const express = require('express');
const router = express.Router();


const shopController = require('../controllers/shopController');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productid', shopController.getProduct);

router.get('/categories/:categoryid', shopController.getProductsByCategoryId);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/delete-cartitem', shopController.postCartItemDelete)

// router.get('/details', shopController.getProductDetail);

router.get('/cart', shopController.getCart);

// router.get('/orders', shopController.getOrders);

module.exports = router;