const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
const csurf = require('csurf')

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/shopRoutes');
const accountRoutes = require('./routes/accountRoutes')

const mongoose = require('mongoose')

const User = require('./models/userModel');

const errorController = require('./controllers/errorController');


var store = new mongoDbStore({
    uri:'mongodb+srv://ibrahimgedik:8vkl2SKvTTxCQxiH@cluster0.aramg.mongodb.net/node-app?retryWrites=true&w=majority',
    collection: 'mySessions'
})

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge:3600000
    },
    store:store
}));


app.use((req, res, next) => {

    if (!req.session.user) {
        return next();
    }

    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => { console.log(err) });
});

app.use(csurf());



// Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(accountRoutes);

app.use(errorController.get404Page);

mongoose.connect('mongodb+srv://ibrahimgedik:8vkl2SKvTTxCQxiH@cluster0.aramg.mongodb.net/node-app?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000)
    })
    .catch( error => {
        console.log(error);
    })