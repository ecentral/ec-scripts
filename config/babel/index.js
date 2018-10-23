const resolveBabelPresets = require('../../lib/utils/resolveBabelPresets');

module.exports = (options) => {
    if (options.testMode) {
        return {
            presets: resolveBabelPresets([
                ['@babel/preset-env', {
                    targets: {
                        node: 'current',
                    },
                }],
            ]),
            plugins: [
                '@babel/plugin-proposal-class-properties',
            ],
        };
    }

    return {
        presets: resolveBabelPresets([
            ['@babel/preset-env', {
                modules: false,
                targets: {
                    browsers: options.browserList,
                },
            }],
        ]),
        plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            '@babel/plugin-proposal-class-properties',
        ],
    };
};
