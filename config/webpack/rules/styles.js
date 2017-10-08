const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (options) => {
    if (options.devMode) {
        return {
            test: /\.(css|scss)$/,
            use: [
                { loader: 'style-loader' },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: true,
                        localIdentName: '[name]_[local]__[hash:base64:5]',
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
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
        };
    }

    return {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: true,
                        localIdentName: '[name]__[hash:base64:5]',
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
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
        }),
    };
};
