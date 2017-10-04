const requireBabelPresets = require('../../lib/utils/requireBabelPresets');

module.exports = (options) => ({
    presets: requireBabelPresets([
        ['env', {
            modules: false,
            targets: {
                browsers: options.browserList,
            },
        }],
        'stage-1',
    ]),
});
