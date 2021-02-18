const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Order = require('../models/orderModel')

// Get Index
module.exports.getIndex = (req, res, next) => {
    // console.log(req.session.isAuthenticated);
    Product.find()
        .then(products => {
            return products;
        }).then(products => {
            Category.find()
                .then(categories => {
                    res.render('shop/products', {
                        title: 'Homepage | Shopping',
                        products: products,
                        categories: categories,
                        path: '/'
                    });
                })
        })
}

// Get Products
module.exports.getProducts = (req, res, next) => {

    Product.find()
        .then(products => {
            return products;
        }).then(products => {
            Category.find()
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

    Category.find()
        .then(categories => {
            model.categories = categories
            return Product.find({
                categories: categoryid
            })
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

    // Product.findById(req.params.productid)
    Product.findOne({
            _id: req.params.productid
        })
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
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            res.render('shop/cart', {
                title: 'Cart | Shopping',
                path: '/cart',
                products: user.cart.items
            });
            console.log(user.cart.items);
        }).catch(err => {
            console.log(err);
        });
}

// Post Cart
module.exports.postCart = (req, res, next) => {

    const productId = req.body.productId;

    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product)
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
    Order.find({'user.userId': req.user._id})
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
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const order = new Order({
                user:{
                    userId: req.user._id,
                    name:req.user.name,
                    email:req.user.email
                },
                items: user.cart.items.map(p => {
                    return {
                        product:{
                            _id:p.productId._id,
                            name:p.productId.name,
                            price:p.productId.price,
                            image:p.productId.image
                        },
                        quantity:p.quantity
                    }
                })
            })
            return order.save()
        })
        .then(() => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders')
        })
}