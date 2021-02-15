const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://ibrahimgedik:8vkl2SKvTTxCQxiH@cluster0.aramg.mongodb.net/node-app?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected database');
        _db = client.db();
        callback(client);
    })
    .catch(error => {
        console.log(error);
        throw error
    })
}

const getdb = () => {
    if(_db) {
        return _db;
    }
    throw 'No Database'
}

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;