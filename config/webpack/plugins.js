const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const settings = require('../../lib/settings');

module.exports = (options) => {
    const plugins = [];

    // Define which folders to clean up before webpack runs
    const cleanUpPaths = (options.devMode)
        ? [path.resolve(settings.appPath, options.buildDir)]
        : [path.resolve(settings.appPath, options.distDir)];

    // Add clean up plugin
    plugins.push(
        new CleanWebpackPlugin(
            cleanUpPaths,
            { root: settings.appPath }
        ),
    );

    // Resolve assets folder
    const assetsPath = path.resolve(settings.appPath, options.srcDir, options.assetsDir);

    // Add copy plugin if an assets folder exists
    if (fs.existsSync(assetsPath)) {
        const assetsOutputPath = path.resolve(
            settings.appPath,
            (options.devMode) ? options.buildDir : options.distDir,
            // Use same assets folder name, but strip relative (../)
            options.assetsDir.replace(/^(?:\.\.\/)+/, '')
        );

        plugins.push(
            new CopyWebpackPlugin([
                { from: assetsPath, to: assetsOutputPath },
            ])
        );
    }

    // Add html plugin if a template is set
    if (options.htmlTemplate) {
        plugins.push(
            new HtmlWebpackPlugin({
                title: options.title,
                template: options.htmlTemplate,
            }),
        );
    }

    // Add additional plugins for development
    if (options.devMode) {
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

    // Add additional plugins for production
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
