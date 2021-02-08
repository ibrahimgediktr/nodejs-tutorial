const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/shopRoutes');

const errorController = require('./controllers/errorController')

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404Page);

app.listen(3000, () => {
    console.log('Listening port on 3000...');
})