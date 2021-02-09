const Product = require('../models/productModel')

// Get Products
module.exports.getProducts = (req, res, next) => {

    const products = Product.getAll();

    res.render('admin/products', {
        title: 'Admin Products | Shopping',
        products: products,
        path: '/admin/products',
        action : req.query.action
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

    const product = Product.getById(req.params.productid);

    res.render('admin/edit-product', {
        title: 'Edit Product | Shopping',
        path: '/admin/products',
        product: product
    });
}

// Post Edit Product
module.exports.postEditProduct = (req, res, next) => {
    const product = Product.getById(req.body.id);

    product.name = req.body.productName
    product.price = req.body.productPrice
    product.image = req.body.productImage
    product.description = req.body.productDescription

    Product.Update(product)
    res.redirect('/admin/products?action=edit');
}

module.exports.postDeleteProduct = (req, res, next) => {
    Product.DeleteById(req.body.productid);
    res.redirect('/admin/products?action=delete')
}