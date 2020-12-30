const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

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
        new WebpackPwaManifest({
            name: 'Todo List',
            short_name: '',
            fingerprints: false,
            publicPath: '/',
            includeDirectory: true,
            description: 'Yet another todo app no one asked for :pogChamp:',
            icons: [
              {
                src: path.resolve('user/src/assets/favicons/android-chrome-192x192.png'),
                sizes: [192]
              },
              {
                src: path.resolve('user/src/assets/favicons/android-chrome-512x512.png'),
                size: [512]
              }
            ]
        })
    ]
}