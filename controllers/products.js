const products = [{
        name: 'Samsung S8',
        price: 3000,
        image: '1.jpg',
        description: 'İyi Telefon'
    },
    {
        name: 'Samsung S7',
        price: 2000,
        image: '2.jpg',
        description: 'İdare eder'
    },
    {
        name: 'Samsung S9',
        price: 4000,
        image: '3.jpg',
        description: 'Çok iyi'
    },
    {
        name: 'Iphone 7S',
        price: 3000,
        image: '4.jpg',
        description: 'İyi Telefon'
    }
]

module.exports.getProducts = (req, res, next) => {

    res.render('index', {
        title: 'Homepage | Shopping',
        products: products,
        path: '/'
    });
}

module.exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        title: 'Add a New Product | Shopping',
        path: '/admin/add-product'
    });
}

module.exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    products.push({
        name: req.body.productName,
        price: req.body.productPrice,
        image: req.body.productImage,
        description: req.body.productDescription
    });
    res.redirect('/');
}