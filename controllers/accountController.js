const User = require('../models/userModel')
const bcrypt = require('bcrypt')

module.exports.getLogin = (req, res, next) => {
    res.render('account/login', {
        title: 'Login | Shopping',
        path: '/login',
        isAuthenticated: req.session.isAuthenticated,
    })
}

module.exports.postLogin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email:email
    })
    .then(user => {
        if(!user){
            return res.redirect('/login')
        }
        bcrypt.compare(password, user.password)
            .then(isSuccess => {
                if(isSuccess){
                    req.session.user = user;
                    req.session.isAuthenticated = true
                    return req.session.save(function(err){
                        var url = req.session.redirectTo || '/';
                        delete req.session.redirectTo
                        return res.redirect(url)
                    })
                }
                res.redirect('/login')
            })
    })
}

module.exports.getRegister = (req, res, next) => {
    res.render('account/register', {
        title: 'Register | Shopping',
        path: '/register',
        isAuthenticated: req.session.isAuthenticated
    })
}

module.exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
            email: email
        })
        .then(user => {
            if (user) {
                return res.redirect('/register')
            }
            return bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    const newUser = new User({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        cart: {
                            items: []
                        }
                    })
                    return newUser.save()
                })
        })
        .then(() => {
            res.redirect('/login')
        })

}

module.exports.getReset = (req, res, next) => {
    res.render('account/reset', {
        title: 'Reset | Shopping',
        path: '/reset'
    })
}

module.exports.postReset = (req, res, next) => {
    res.redirect('/login')
}

module.exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/')
    })
}