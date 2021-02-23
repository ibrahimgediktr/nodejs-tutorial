const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');



sgMail.setApiKey("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")



module.exports.getLogin = (req, res, next) => {
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage
    res.render('account/login', {
        title: 'Login | Shopping',
        path: '/login',
        errorMessage: errorMessage
    })
}

module.exports.postLogin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                req.session.errorMessage = 'No record was found with this e-mail address.';
                req.session.save(function (err) {
                    console.log(err);
                    return res.redirect('/login')
                })
            }
            bcrypt.compare(password, user.password)
                .then(isSuccess => {
                    if (isSuccess) {
                        req.session.user = user;
                        req.session.isAuthenticated = true
                        return req.session.save(function (err) {
                            var url = req.session.redirectTo || '/';
                            delete req.session.redirectTo
                            return res.redirect(url)
                        })
                    }
                    res.redirect('/login')
                }).catch(err => {
                    console.log(err);
                })
        }).catch(err => {
            console.log(err);
        })
}

module.exports.getRegister = (req, res, next) => {
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage
    res.render('account/register', {
        title: 'Register | Shopping',
        path: '/register',
        errorMessage: errorMessage
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
                req.session.errorMessage = 'This email address is already registered.';
                req.session.save(function (err) {
                    console.log(err);
                    return res.redirect('/login')
                })
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

            res.redirect('/login');

            const msg = {
                to: email, // Change to your recipient
                from: 'ibrahim.gedik@outlook.com.tr', // Change to your verified sender
                subject: 'Created Account',
                text: 'Your account has been successfully created.',
                html: `
                <h1>Welcome to our shopping website. We were happy to see you among us.</h1>
                <p>
                Click on the link below to go to the website
                </p>
                <p>
                <a href="http://localhost:3000/">Shopping Website</a>
                </p>
                `,
            }

            sgMail.send(msg).then(() => {
                console.log('Message sent')
            }).catch((error) => {
                console.log(error.response.body)
                // console.log(error.response.body.errors[0].message)
            })
        })

}

module.exports.getReset = (req, res, next) => {
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage

    res.render('account/reset', {
        title: 'Reset Password | Shopping',
        path: '/reset-password',
        errorMessage: errorMessage
    })
}

module.exports.postReset = (req, res, next) => {

    const email = req.body.email;

    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset-password')
        }
        const token = buffer.toString('hex');
        console.log(token);

        User.findOne({
                email: email
            })
            .then(user => {
                if (!user) {
                    req.session.errorMessage = 'No account found with this email address.';
                    req.session.save(function (err) {
                        console.log(err);
                        return res.redirect('/reset-password')
                    })
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;

                return user.save();
            }).then(() => {
                res.redirect('/');

                const msg = {
                    to: email, // Change to your recipient
                    from: 'ibrahim.gedik@outlook.com.tr', // Change to your verified sender
                    subject: 'Reset your password',
                    text: 'To reset your password, follow the instructions below.',
                    html: `
                        <p>Click the link below to update your password.</p>
                        <p>
                        <a href="http://localhost:3000/reset-password/${token}">Reset my password</a>
                        </p>
                    `,
                }
                sgMail.send(msg).then(() => {
                    console.log('Message sent')
                }).catch((error) => {
                    console.log(error)
                })

            })
    })
}

module.exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/')
    })
}

module.exports.getNewPassword = (req, res, next) => {
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage
    const token = req.params.token;

    User.findOne({
        resetToken: token,
        resetTokenExpiration: {
            $gt: Date.now()
        }
    }).then(user => {
        res.render('account/new-password', {
            title: 'New Password | Shopping',
            path: '/new-password',
            errorMessage: errorMessage,
            userId: user._id.toString(),
            passwordToken: token
        })
    }).catch(err => {
        console.log(err);
    })
}

module.exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const token = req.body.passwordToken;
    const userId = req.body.userId;

    let _user;

    User.findOne({
        resetToken: token,
        resetTokenExpiration: {
            $gt: Date.now()
        },
        _id: userId
    }).then(user => {
        _user = user;
        return bcrypt.hash(newPassword, 10);
    }).then(hashedPassword => {
        _user.password = hashedPassword
        _user.resetToken = undefined;
        _user.resetTokenExpiration = undefined;
        return _user.save()
    }).then(() => {
        res.redirect('/login')
    }).catch(err => {
        console.log(err);
    })

}