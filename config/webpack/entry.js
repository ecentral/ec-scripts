module.exports = ({
    devMode,
    host,
    port,
    srcDir,
}) => {
    if (devMode) {
        const URL = `http://${host}:${port}`;
        const devServerEntries = [
            `webpack-dev-server/client?${URL}`,
            'webpack/hot/dev-server',
        ];

        return {
            app: [
                ...devServerEntries,
                'babel-polyfill',
                `${srcDir}/index.js`,
            ],
        };
    }

    return {
        app: [
            'babel-polyfill',
            `${srcDir}/index.js`,
        ],
    };

    // TODO: Add helper for entry files configuration
    // Should use a mapping like [{ bundleName: entryFile }]
    // and add devServerEntries and polyfills automatically?
    // We could also make this mapping part of the options.
};
