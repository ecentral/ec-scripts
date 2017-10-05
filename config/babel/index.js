const resolveBabelPresets = require('../../lib/utils/resolveBabelPresets');

module.exports = (options) => ({
    presets: resolveBabelPresets([
        ['env', {
            modules: false,
            targets: {
                browsers: options.browserList,
            },
        }],
        'stage-1',
    ]),
});
