const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session)

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/shopRoutes');
const accountRoutes = require('./routes/accountRoutes')

app.use((req, res, next) => {
    User.findByName('ibrahimgedik')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next()
        })
        .catch(error => {
            console.log(error);
        })
})
const mongoConnect = require('./utility/database.js').mongoConnect;

const errorController = require('./controllers/errorController');

const User = require('./models/userModel');

var store = new mongoDbStore({
    uri:'mongodb+srv://ibrahimgedik:8vkl2SKvTTxCQxiH@cluster0.aramg.mongodb.net/node-app?retryWrites=true&w=majority',
    collection: 'mySessions'
})

app.use(bodyParser.urlencoded({
    extended: false
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



// Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(accountRoutes);

app.use(errorController.get404Page);

mongoConnect(() => {

    User.findByName('ibrahimgedik')
        .then(user => {
            if (!user) {
                user = new User('ibrahimgedik', 'email@ibrahimgedik.com');
                return user.save()
            }
            return user;
        })
        .then(user => {
            app.listen(3000)
        })
        .catch(error => {
            console.log(error);
        })
});