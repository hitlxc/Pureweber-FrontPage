var path = require('path');

module.exports = {
    entry: {
        app:'./public/js/app.entry.js', 
        edit:'./public/js/edit.entry.js',
        article:'./public/js/article.entry.js',
        invite:'./public/js/invite.entry.js',
        signup:'./public/js/signup.entry.js',
        ['blog-admin']:'./public/js/blog-admin.entry.js',
        ['blog-admin-cat']:'./public/js/blog-admin-cat.entry.js',
        ['blog-admin-tag']:'./public/js/blog-admin-tag.entry.js',
        signup:'./public/js/signup.entry.js'

    },
    output: {
        path: path.join(__dirname, '/public/dist'),
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