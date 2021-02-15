const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/shopRoutes');

app.use((req, res, next) => {
    User.findByName('ibrahimgedik')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            console.log(req.user);
            next()
        })
        .catch(error => {
            console.log(error);
        })
})
const mongoConnect = require('./utility/database.js').mongoConnect

const errorController = require('./controllers/errorController')

const User = require('./models/userModel')

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);

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
            console.log(user);
            app.listen(3000)
        })
        .catch(error => {
            console.log(error);
        })



});