const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


let _db;


const url = process.env.DB_URL

const mongoConnect = (callback) => {
    MongoClient.connect(url)
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