const products = [{
    id: "13575",
    name: 'Samsung S8',
    price: 2500,
    image: '1.jpg',
    description: 'Good phone'
}];

module.exports = class Product {
    constructor(name, price, image, description) {
        this.id = (Math.floor(Math.random() * 99999 + 1)).toString();
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
    }

    saveProduct() {
        products.push(this);
    }

    static getAll() {
        return products;
    }

    static getById(id){
        const product = products.find(i => i.id === id);
        return product
    }

    static Update(product){
        const index = products.findIndex(i => i.id === product.id);

        products[index].name = product.name
        products[index].image = product.image
        products[index].price = product.price
        products[index].description = product.description

    }
}