const getDb = require('../utility/database').getdb;
const mongodb = require('mongodb');

class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart ? cart : {};
        this.cart.items = cart ? cart.items : [];
        this._id = id
    }

    save() {
        const db = getDb()
        return db.collection('users')
            .insertOne(this)
    }

    getCart() {

        const ids = this.cart.items.map(i => {
            return i.productId;
        })

        const db = getDb();

        return db.collection('products')
            .find({
                _id: {
                    $in: ids
                }
            })
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString()
                        }).quantity
                    }
                })
            })
    }

    postCart(product) {

        const index = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString()
        })

        const updatedCartItems = [...this.cart.items];

        let itemQuantity = 1;

        if (index >= 0) {
            itemQuantity = this.cart.items[index].quantity + 1;
            updatedCartItems[index].quantity = itemQuantity;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectID(product._id),
                quantity: itemQuantity
            })
        }

        const db = getDb();
        return db.collection('users')
            .updateOne({
                _id: new mongodb.ObjectId(this._id)
            }, {
                $set: {
                    cart: {
                        items: updatedCartItems
                    }
                }
            })
    }

    deleteCartItem(productid) {

        const cartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productid.toString()
        });

        const db = getDb();

        return db.collection('users')
            .updateOne({
                _id: new mongodb.ObjectID(this._id)
            }, {
                $set: {
                    cart: {
                        items: cartItems
                    }
                }
            })
    }

    static findById(userid) {
        const db = getDb();

        return db.collection('users')
            .findOne({
                _id: new mongodb.ObjectID(userid)
            })
            .then(user => {
                return user
            })
            .catch(error => {
                console.log(error);
            })
    }

    static findByName(username) {
        const db = getDb();

        return db.collection('users')
            .findOne({
                name: username
            })
            .then(user => {
                return user
            })
            .catch(error => {
                console.log(error);
            })
    }

}

module.exports = User