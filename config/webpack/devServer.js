const path = require('path');
const settings = require('../../lib/settings');

module.exports = (options) => ({
    contentBase: path.resolve(settings.appPath, options.buildDir),
    hot: true,
    inline: true,
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
    },
});
