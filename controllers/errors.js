module.exports.get404Page = (req, res) => {
    res.render('404.pug', {
        title: 'Page Not Found | Shopping'
    })
}