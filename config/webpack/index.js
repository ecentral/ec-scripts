const path = require('path');

const localNodeModules = path.resolve(__dirname, '../../', 'node_modules');

module.exports = ({ addons, options }) => ({
    entry: require('./entry')(options),
    output: require('./output')(options),

    target: 'web',
    // TODO: Check if sourcemaps work for devMode
    devtool: options.devMode
        ? 'eval-source-map'
        : 'source-map',

    module: {
        rules: [
            require('./rules/scripts')(addons),
            require('./rules/styles')(options),
        ],
    },

    plugins: require('./plugins')(options),

    resolve: {
        modules: ['./node_modules/', localNodeModules],
        extensions: [
            '.js',
        ],
    },

    resolveLoader: {
        modules: ['./node_modules/', localNodeModules],
    },

    devServer: {
        contentBase: options.buildDir,
        hot: true,
        inline: true,
        stats: {
            // Todo: Does this even work?
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
        },
    },
});
