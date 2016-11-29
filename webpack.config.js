var path = require('path');

module.exports = {
    entry: {
        edit:'./edit/edit.app.js',
        //login:'./login/login.entry.js'
        //show_article:'./show_article/show_article.entry.js'

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
        ]
    }
}