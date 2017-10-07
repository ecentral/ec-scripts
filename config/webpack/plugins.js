const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ devMode, htmlTemplate, title }) => {
    const plugins = [];

    if (htmlTemplate) {
        plugins.push(
            new HtmlWebpackPlugin({
                title,
                template: htmlTemplate,
            }),
        );
    }

    if (devMode) {
        plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development'),
                },
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
        );

        return plugins;
    }

    plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                screw_ie8: true,
                warnings: false,
                unused: true,
                dead_code: true,
            },
            mangle: {
                screw_ie8: true,
            },
            output: {
                screw_ie8: true,
                comments: false,
            },
        }),
    );

    return plugins;
};
