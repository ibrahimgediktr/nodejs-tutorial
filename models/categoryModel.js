const getDb = require('../utility/database').getdb;
const mongodb = require('mongodb');


class Category {
    constructor(name, description, id) {
        this.name = name;
        this.description = description;
        this._id = id ? new mongodb.ObjectID(id) : null;
    }

    save() {
        let db = getDb();

        if (this._id) {
            db = db.collection('categories').updateOne({
                _id: this._id
            }, {
                $set: this
            })
        } else {
            db = db.collection('categories').insertOne(this)
        }

        return db
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    static findAll() {
        const db = getDb();

        return db.collection('categories')
            .find()
            .toArray()
            .then(categories => {
                return categories
            })
            .catch(err => console.log(err));
    }

    static findById(categoryid) {
        const db = getDb();

        return db.collection('categories')
            .findOne({
                _id: new mongodb.ObjectID(categoryid)
            })
            .then(category => {
                return category
            })
            .catch(error => {
                console.log(error);
            })
    }

}

module.exports = Category




// const categories = [{
//         id: "1",
//         name: 'Telefon'
//     },
//     {
//         id: "2",
//         name: 'Bilgisayar'
//     },
//     {
//         id: "3",
//         name: 'Tablet'
//     }
// ]


// class Category {
//     constructor(name) {
//         this.id = (categories.length + 1).toString();
//         this.name = name
//     }

//     saveCategory() {
//         categories.push(this);
//     }

//     static getAll() {
//         return categories;
//     }

//     static getById(id) {
//         return categories.find(i => i.id === id);
//     }

//     static update(category) {
//         const index = categories.findIndex(i => i.id === category.id);

//         categories[index].name = category.name
//     }

//     static deleteById(id) {
//         const index = categories.find(i => i.id === id)
//         categories.splice(index, 1);

//     }
// }

// module.exports = Category