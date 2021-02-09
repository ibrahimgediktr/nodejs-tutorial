const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

// Get Index
module.exports.getIndex = (req, res, next) => {

    const products = Product.getAll();
    const categories = Category.getAll();

    res.render('shop/index', {
        title: 'Homepage | Shopping',
        products: products,
        categories: categories,
        path: '/'
    });
}

// Get Products
module.exports.getProducts = (req, res, next) => {

    const products = Product.getAll();
    const categories = Category.getAll();

    res.render('shop/products', {
        title: 'Products | Shopping',
        products: products,
        categories: categories,
        path: '/products'
    });
}

// Get Products By Id
module.exports.getProductsByCategoryId = (req, res, next) => {

    const categoryId = req.params.categoryid;
    const products = Product.getProductsByCategoryId(categoryId)
    const categories = Category.getAll();

    res.render('shop/products', {
        title: 'Products | Shopping',
        products: products,
        categories: categories,
        selectedCategory: categoryId,
        path: '/products'
    })
}

// Get Product
module.exports.getProduct = (req, res, next) => {

    const productId = req.params.productid;
    const product = Product.getById(productId);


    res.render('shop/product-detail', {
        title: product.name,
        product: product,
        path: '/products'
    })
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


// Get Add Product
module.exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        title: 'Add a New Product | Shopping',
        path: '/admin/add-product'
    });
}

// Post Add Product
module.exports.postAddProduct = (req, res, next) => {

    const product = new Product(req.body.productName, req.body.productPrice, req.body.productImage, req.body.productDescription, req.body.productCategory);

    product.saveProduct();
    res.redirect('/');
}