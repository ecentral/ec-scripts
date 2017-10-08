const resolveBabelPresets = require('../../lib/utils/resolveBabelPresets');

module.exports = (options) => {
    if (options.testMode) {
        return {
            presets: resolveBabelPresets([
                ['env', {
                    targets: {
                        node: 'current',
                    },
                }],
                'stage-1',
            ]),
        };
    }

    return {
        presets: resolveBabelPresets([
            ['env', {
                modules: false,
                targets: {
                    browsers: options.browserList,
                },
            }],
            'stage-1',
        ]),
    };
};
