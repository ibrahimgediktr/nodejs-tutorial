const Product = require('../models/productModel');
const Category = require('../models/categoryModel')

// Get Products
module.exports.getProducts = (req, res, next) => {

    Product.find()
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Products | Shopping',
                products: products,
                path: '/admin/products',
                action: req.query.action,
                isAuthenticated:req.session.isAuthenticated
                
            });
        })
}

// Get Add Product
module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        title: 'Add a New Product | Shopping',
        path: '/admin/add-product',
        isAuthenticated:req.session.isAuthenticated
    });
}

// Post Add Product
module.exports.postAddProduct = (req, res, next) => {

    const name = req.body.productName;
    const price = req.body.productPrice;
    const description = req.body.productDescription;
    const image = req.body.productImage;

    const product = new Product({
        name: name,
        price: price,
        image: image,
        description: description,
        userId: req.user
    });

    product.save()
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(error => {
            console.log(error);
        })
}

// Get Edit Product
module.exports.getEditProduct = (req, res, next) => {

    Product.findById(req.params.productid)
        .then(product => {
            return product
        })
        .then(product => {
            Category.find()
                .then(categories => {

                    categories = categories.map(category => {
                        if(product.categories){
                            product.categories.find(item => {
                                if(item.toString() === category._id.toString()) {
                                    category.selected = true;
                                }
                            })
                        }
                        return category
                    })

                    res.render('admin/edit-product', {
                        title: 'Edit Product | Shopping',
                        path: '/admin/products',
                        product: product,
                        categories: categories,
                        isAuthenticated:req.session.isAuthenticated
                    })
                })
        })
        .catch(error => {
            console.log(error);
        })
}

// Post Edit Product
module.exports.postEditProduct = (req, res, next) => {

    const id = req.body.id
    const name = req.body.productName
    const price = req.body.productPrice
    const image = req.body.productImage
    const description = req.body.productDescription
    const ids = req.body.categoryids

    // Product.findById(id)
    //     .then(product => {
    //         product.name = name;
    //         product.price = price;
    //         product.image = image;
    //         product.description = description;
    //         product.categories= ids
    //         return product.save()
    //     })
    Product.update({
            _id: id
        }, {
            $set: {
                name: name,
                price: price,
                image: image,
                description: description,
                categories: ids
            }
        })
        .then(() => {
            res.redirect('/admin/products?action=edit')
        })
}

// Post Delete Product
module.exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.productid

    Product.deleteOne({
            _id: id
        })
        .then(() => {
            console.log('Product has been deleted');
            res.redirect('/admin/products?action=delete')
        })
        .catch(error => {
            console.log(error);
        })
}

// Get Add Category
module.exports.getAddCategory = (req, res, next) => {
    res.render('admin/add-category', {
        title: 'New Category | Shopping',
        path: '/admin/add-category',
        isAuthenticated:req.session.isAuthenticated

    })
}

// Post Add Category
module.exports.postAddCategory = (req, res, next) => {

    const name = req.body.categoryName;
    const description = req.body.categoryDescription;

    const category = new Category({
        name: name,
        description: description
    })

    category.save()
        .then(() => {
            res.redirect('/admin/categories?action=create')
        })
        .catch(error => {
            console.log(error);
        })
}

module.exports.getCategories = (req, res, next) => {

    Category.find()
        .then(categories => {
            res.render('admin/categories', {
                title: 'Categories | Shopping',
                path: '/admin/categories',
                categories: categories,
                action: req.query.action,
                isAuthenticated:req.session.isAuthenticated

            })
        })
        .catch(error => {
            console.log(error);
        })
}

module.exports.getEditCategory = (req, res, next) => {

    Category.findById(req.params.categoryid)
        .then(category => {
            res.render('admin/edit-category', {
                title: 'Edit Category | Shopping',
                path: '/admin/categories',
                category: category,
                isAuthenticated:req.session.isAuthenticated

            })
        })

}

module.exports.postEditCategory = (req, res, next) => {

    const id = req.body.id;
    const name = req.body.categoryName;
    const description = req.body.categoryDescription;

    Category.findById(id)
        .then(category => {
            category.name = name;
            category.description = description
            return category.save()
        }).then(() => {
            res.redirect('/admin/categories?action=edit')
        })
}

module.exports.postDeleteCategory = (req, res, next) => {
    const id = req.body.categoryid;

    Category.findOneAndRemove(id)
        .then(() => {
            res.redirect('/admin/categories?action=delete')
        })
}