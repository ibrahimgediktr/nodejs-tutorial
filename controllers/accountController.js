// module.exports.getLogin = (req, res, next) => {
//     res.render('account/login', {
//         title: 'Login | Shopping',
//         path: '/login'
//     })
// }

// module.exports.postLogin = (req, res, next) => {

//     const email = req.body.email;
//     const password = req.body.password;

//     if ((email == 'email@gmail.com') && (password == '1234')) {
//         req.session.isAuthenticated = true;
//         res.redirect('/')
//     } else {
//         res.redirect('/login')
//     }

// }

// module.exports.getRegister = (req, res, next) => {
//     res.render('account/register', {
//         title: 'Register | Shopping',
//         path: '/register'
//     })
// }

// module.exports.postRegister = (req, res, next) => {
//     res.redirect('/login')
// }

// module.exports.getReset = (req, res, next) => {
//     res.render('account/reset', {
//         title: 'Reset | Shopping',
//         path: '/reset'
//     })
// }

// module.exports.postReset = (req, res, next) => {
//     res.redirect('/login')
// }