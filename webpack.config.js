var path = require('path');

module.exports = {
    entry: {
        edit:'./edit/edit.entry.js',
        login:'./login/login.entry.js'
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
            { test: /\.jsx?$/, loaders: ['babel'] }
        ]
    }
}