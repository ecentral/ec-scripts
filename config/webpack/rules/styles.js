const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (options) => ({
    test: /\.(css|scss)$/,
    use: [
        options.devMode
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                modules: false,
                // If modules are enabled, they resolve to this pattern
                localIdentName: '[name]_[local]__[hash:base64:5]',
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                plugins: [
                    autoprefixer({
                        browsers: options.browserList,
                    }),
                ],
            },
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
                includePaths: [
                    path.resolve(options.srcDir, options.stylesDir),
                ],
            },
        },
    ],
});
