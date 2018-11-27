'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    return {
        entry: ['babel-polyfill', './src'],
        output: {
            publicPath: '/'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: { module: 'es2015' }
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: { name: '[path][name].[hash].[ext]' }
                        }
                    ]
                }
            ]
        },
        plugins: [
            // tailwindcss(path.join(__dirname, 'tailwind.js')),
            require('autoprefixer'),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
                NODE_ENV: JSON.stringify('development'),
                API_URL: JSON.stringify('http://localhost:3000')
            }),
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html'),
            }),
            new webpack.HashedModuleIdsPlugin()
        ],
        optimization: { splitChunks: { chunks: 'all' } }
    };
};
