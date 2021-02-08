const products = [];

module.exports = class Product {
    constructor(name, price, image, description){
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
    }

    saveProduct(){
        products.push(this);
    }

    static getAll(){
        return products;
    }
}
