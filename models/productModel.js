const products = [{
        id: "13575",
        name: 'Samsung S8',
        price: 2500,
        image: '1.jpg',
        description: 'Good Phone',
        categoryid: '1'
    },
    {
        id: "65874",
        name: 'Iphone 11',
        price: 8000,
        image: '2.jpg',
        description: 'Perfect Phone',
        categoryid: '1'
    },
    {
        id: "23654",
        name: 'Samsung Tablet',
        price: 8000,
        image: '5.jpg',
        description: 'Perfect Tablet',
        categoryid: '3'
    },
    {
        id: "54658",
        name: 'Xiamoi Laptop',
        price: 8000,
        image: '6.jpg',
        description: 'Perfect Laptop',
        categoryid: '2'
    },
    {
        id: "15487",
        name: 'Surface Laptop',
        price: 3500,
        image: '7.jpg',
        description: 'Perfect Laptop',
        categoryid: '2'
    }
];

module.exports = class Product {
    constructor(name, price, image, description, categoryid) {
        this.id = (Math.floor(Math.random() * 99999 + 1)).toString();
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.categoryid = categoryid
    }

    saveProduct() {
        products.push(this);
    }

    static getAll() {
        return products;
    }

    static getById(id) {
        return products.find(i => i.id === id);
    }

    static getProductsByCategoryId(categoryid) {
        return products.filter(i => i.categoryid === categoryid);
    }

    static Update(product) {
        const index = products.findIndex(i => i.id === product.id);

        products[index].name = product.name
        products[index].image = product.image
        products[index].price = product.price
        products[index].description = product.description
        products[index].categoryid = product.categoryid

    }

    static DeleteById(id) {
        const index = products.find(i => i.id === id);
        products.splice(index, 1);
    }
}