module.exports = (options) => {
    if (options.testMode) {
        return {
            presets: [
                [require.resolve('@babel/preset-env'), {
                    targets: {
                        node: 'current',
                    },
                }],
            ],
            plugins: [
                require.resolve('@babel/plugin-proposal-class-properties'),
            ],
        };
    }

    return {
        presets: [
            [require.resolve('@babel/preset-env'), {
                modules: false,
                targets: {
                    browsers: options.browserList,
                },
            }],
        ],
        plugins: [
            require.resolve('@babel/plugin-syntax-dynamic-import'),
            require.resolve('@babel/plugin-syntax-import-meta'),
            require.resolve('@babel/plugin-proposal-class-properties'),
        ],
    };
};
