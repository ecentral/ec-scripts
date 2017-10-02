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
        modules: ['./node_modules/', localNodeModules],
        extensions: [
            '.js',
            // '.jsx',
        ],
    },

    resolveLoader: {
        modules: ['./node_modules/', localNodeModules],
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
