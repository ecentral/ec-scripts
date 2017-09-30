const path = require('path');

const localNodeModules = path.resolve(__dirname, '../../', 'node_modules');

module.exports = (options) => ({
    entry: require('./entry')(options),
    output: require('./output')(options),

    target: 'web',
    devtool: options.devMode
        ? 'eval-source-map'
        : 'source-map',

    module: {
        rules: [
            require('./rules/scripts')(options),
            require('./rules/styles')(options),
        ],
    },

    resolve: {
        modules: ['./node_modules/'],
        extensions: [
            '.js',
            // '.jsx',
        ],
        alias: {
            'babel-loader': path.resolve(localNodeModules, 'babel-loader'),
            'babel-polyfill': path.resolve(localNodeModules, 'babel-polyfill'),
            webpack: path.resolve(localNodeModules, 'webpack'),
            'webpack-dev-server': path.resolve(localNodeModules, 'webpack-dev-server'),
        },
    },

    devServer: {
        contentBase: options.buildDir,
        hot: true,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
        },
    },
});
