const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'range-slider.min.js'
    },
    devServer: {
        open: true,
        host: 'localhost',
        watchFiles: ['index.html']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: false,
            filename: 'example.html'
        }),

        new MiniCssExtractPlugin({
            filename: 'range-slider.min.css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }

    return config;
};
