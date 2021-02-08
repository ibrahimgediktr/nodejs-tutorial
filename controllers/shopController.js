const Product = require('../models/productModel');

// Get Index
module.exports.getIndex = (req, res, next) => {

    const products = Product.getAll();
    res.render('shop/index', {
        title: 'Homepage | Shopping',
        products: products,
        path: '/'
    });
}

// Get Products
module.exports.getProducts = (req, res, next) => {

    const products = Product.getAll();
    res.render('shop/products', {
        title: 'Products | Shopping',
        products: products,
        path: '/products'
    });
}

// Get Product Detail
module.exports.getProductDetail = (req, res, next) => {

    res.render('shop/details', {
        title: 'Details | Shopping',
        path: '/details'
    });
}

// Get Cart
module.exports.getCart = (req, res, next) => {

    res.render('shop/cart', {
        title: 'My Cart | Shopping',
        path: '/cart'
    });
}

// Get Orders
module.exports.getOrders = (req, res, next) => {

    res.render('shop/orders', {
        title: 'My Orders | Shopping',
        path: '/orders'
    });
}

// ------------------------------

// Get Add Product
module.exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        title: 'Add a New Product | Shopping',
        path: '/admin/add-product'
    });
}

// Post Add Product
module.exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.productName, req.body.productPrice, req.body.productImage, req.body.productDescription);

    product.saveProduct();
    res.redirect('/');
}