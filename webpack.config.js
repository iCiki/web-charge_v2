const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src/js'),
    entry: {
        js: './app.js',
        vendor: ['jquery', 'weui.js', 'router', 'iswiper', 'art-template/dist/template-debug', 'vconsole']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: 'style!css!postcss!less'
            }, {
                test: /\.(png|jpg|jpeg|gif)/,
                exclude: /node_modules/,
                loader: 'url?limit=8192'
            }, {
                test: /\.json/,
                exclude: /node_modules/,
                loader: 'json'
            }
        ]
    },
    postcss: [autoprefixer],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: process.env.NODE_ENV !== 'production' ? [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.DefinePlugin({
            NODE_ENV: '"development"',
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor','vendor.bundle.js'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html')
        }),
        // new OpenBrowserPlugin({url: 'http://localhost:8080'})
    ] : [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.DefinePlugin({
            NODE_ENV: '"production"',
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor','vendor.bundle.js'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html')
        })
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        disableHostCheck: true,
        /*proxy: {
            '/api': {
                target: 'http://localhost:8080',
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    }
                }
            }
        }*/
    }
};
