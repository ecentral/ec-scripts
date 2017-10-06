const settings = require('../../lib/settings');

module.exports = ({ addons, options }) => ({
    entry: require('./entry')(options),

    output: require('./output')(options),

    target: 'web',

    // TODO: Check if sourcemaps work for devMode
    devtool: options.devMode
        ? 'eval-source-map'
        : 'source-map',

    devServer: require('./devServer')(options),

    module: {
        rules: [
            require('./rules/scripts')(addons),
            require('./rules/styles')(options),
        ],
    },

    plugins: require('./plugins')(options),

    resolve: {
        modules: ['./node_modules/', settings.nodeModulesPath],
        extensions: [
            '.js',
        ],
    },

    resolveLoader: {
        modules: ['./node_modules/', settings.nodeModulesPath],
    },
});
