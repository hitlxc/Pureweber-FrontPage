var path = require('path');

module.exports = {
    entry: {
        edit:'./edit/edit.app.js',
        //login:'./login/login.app.js'
        //articlecard:'./articlecard/articlecard.app.js'
        //invite:'./invite/invite.app.js'
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