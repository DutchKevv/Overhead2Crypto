const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    watch: false,
    entry: path.join(__dirname, '../src/js/index.ts'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../../public'),
        clean: true
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/html/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                use: {
                    loader: 'ts-loader'
                },
                exclude: /node_modules/,
                test: /\.(ts|tsx)?$/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [

                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader"
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};