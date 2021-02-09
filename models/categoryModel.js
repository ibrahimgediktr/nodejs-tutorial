const categories = [{
        id: "1",
        name: 'Telefon'
    },
    {
        id: "2",
        name: 'Bilgisayar'
    },
    {
        id: "3",
        name: 'Tablet'
    }
]


module.exports = class Category {
    constructor(name) {
        this.id = (categories.length + 1).toString();
        this.name = name
    }

    saveCategory() {
        categories.push(this);
    }

    static getAll() {
        return categories;
    }

    static getById(id) {
        return categories.find(i => i.id === id);
    }

    static update(category) {
        const index = categories.findIndex(i => i.id === category.id);

        categories[index].name = category.name
    }

    static deleteById(id) {
        const index = categories.find(i => i.id === id)
        categories.splice(index, 1);

    }
}