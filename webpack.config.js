const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    resolve: {
        fallback: {
            "fs": false,
            "path": false,
            "os": false,
        }
    },
    module: {
        rules: [
          { test: /\.svg$/, use: 'svg-inline-loader' },
          { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
          { test: /\.(js)$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [
        //new HtmlWebpackPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    mode: 'production',
    target: "web",
};