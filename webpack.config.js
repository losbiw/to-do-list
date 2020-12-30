const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './user/src/index.js',
    output: {
        path: path.resolve(__dirname, 'server/build'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.(js)$/, 
                use: 'babel-loader' 
            },
            { 
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'] 
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            }
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'user/public/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: './user/src/assets/favicons',
                to: 'favicons'
            }]
        }),
    ]
}