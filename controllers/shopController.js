const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

// Get Index
module.exports.getIndex = (req, res, next) => {
    console.log(req.session.isAuthenticated);
    Product.findAll()
        .then(products => {
            Category.findAll()
                .then(categories => {
                    res.render('shop/index', {
                        title: 'Homepage | Shopping',
                        products: products,
                        categories: categories,
                        path: '/',
                        isAuthenticated: req.session.isAuthenticated
                    });
                })
        })
}

// Get Products
module.exports.getProducts = (req, res, next) => {

    Product.findAll()
        .then(products => {
            Category.findAll()
                .then(categories => {
                    res.render('shop/products', {
                        title: 'Products | Shopping',
                        products: products,
                        categories: categories,
                        path: '/products'
                    });
                })
        })
}

// Get Products By Id
module.exports.getProductsByCategoryId = (req, res, next) => {

    const categoryid = req.params.categoryid;
    const model = [];

    Category.findAll()
        .then(categories => {
            model.categories = categories
            return Product.findByCategoryId(categoryid)
        })
        .then(products => {
            res.render('shop/products', {
                title: 'Products | Shopping',
                products: products,
                categories: model.categories,
                selectedCategory: categoryid,
                path: '/products'
            })
        })


}

// Get Product
module.exports.getProduct = (req, res, next) => {

    Product.findById(req.params.productid)
        .then(product => {
            res.render('shop/product-detail', {
                title: product.name,
                product: product,
                path: '/products'
            })
        })
}

// Get Cart
module.exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            res.render('shop/cart', {
                title: 'Cart | Shopping',
                path: '/cart',
                products: products
            });
        }).catch(err => {
            console.log(err);
        });
}

// Post Cart
module.exports.postCart = (req, res, next) => {

    const productId = req.body.productId;

    Product.findById(productId)
        .then(product => {
            return req.user.postCart(product)
        })
        .then(() => {
            res.redirect('/cart')
        })
}

// Delete Cart
module.exports.postCartItemDelete = (req, res, next) => {

    const productid = req.body.productid

    req.user
        .deleteCartItem(productid)
        .then(() => {
            res.redirect('/cart')
        })

}

// Get Orders
module.exports.getOrders = (req, res, next) => {
    req.user
        .getOrders()
        .then(orders => {
            res.render('shop/orders', {
                title: 'Orders | Shopping',
                path: '/orders',
                orders: orders
            })
        })
}

// Post Order
module.exports.postOrder = (req, res, next) => {
    req.user
        .addOrder()
        .then(() => {
            res.redirect('/orders');
        })
}