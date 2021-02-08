const Product = require('../models/productModel')

// Get Products
module.exports.getProducts = (req, res, next) => {

    const products = Product.getAll();

    res.render('admin/products', {
        title: 'Admin Products | Shopping',
        products: products,
        path: '/admin/products'
    });
}

// Get Add Product
module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
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

// Get Edit Product
module.exports.getEditProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        title: 'Edit Product | Shopping',
        path: '/admin/edit-product'
    });
}

// Post Edit Product
module.exports.postEditProduct = (req, res, next) => {
    res.redirect('/');
}