var path = require('path');

module.exports = {
    entry: {
        app:'./public/js/app.entry.js', 
        // edit:'./public/component/edit/edit.app.js',
        //login:'./public/component/login/login.app.js',
        //articlecard:'./public/component/articlecard/articlecard.app.js',
        //invite:'./public/component/invite/invite.app.js',
        //appbar:'./public/component/appbar/appbar.app.js',
        //edit:'./public/js/edit.entry.js',
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