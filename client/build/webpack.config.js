const path = require('path');
const webpack = require('webpack');

console.log('sf')

module.exports = {
    mode: 'development',
    watch: true,
    entry: path.join(__dirname, '../src/js/index.ts'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../../public'),
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
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