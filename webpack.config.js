var path = require('path');

module.exports = {
    entry: {
<<<<<<< HEAD
        //edit:'./component/edit/edit.app.js',
        //login:'./component/login/login.app.js'
        //articlecard:'./component/articlecard/articlecard.app.js'
        //invite:'./component/invite/invite.app.js'
        //appbar:'./component/appbar/appbar.app.js'
        app:'./view/app.entry.js'
=======
        edit:'./component/edit/edit.app.js',
        login:'./component/login/login.app.js',
        articlecard:'./component/articlecard/articlecard.app.js',
        invite:'./component/invite/invite.app.js',
        appbar:'./component/appbar/appbar.app.js',
        app:'view/app.entry.js'
>>>>>>> bea6286440403f7cfe8227452f5ab306f3a2e466
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['babel'] },
            { test: /\.json$/, loader: 'json'},
            { test: /\.css$/, loaders: ['style', 'css']}
        ]
    }
}