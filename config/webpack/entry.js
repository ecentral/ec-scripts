const path = require('path');
const invariant = require('invariant');

module.exports = (options) => {
    const bundledEntries = [];

    if (options.devMode) {
        const url = `http://${options.host}:${options.port}`;
        bundledEntries.push(
            `webpack-dev-server/client?${url}`,
            'webpack/hot/dev-server'
        );
    }

    bundledEntries.push('babel-polyfill');

    if (Array.isArray(options.entryFiles)) {
        return {
            main: [
                ...bundledEntries,
                ...options.entryFiles.map(file => `./${path.join(options.srcDir, file)}`),
            ],
        };
    }

    invariant(
        typeof options.entryFiles === 'object',
        `Invalid type of 'entryFiles'. Please use an Array. Received: ${typeof options.entryFiles}`
    );

    console.warn(`
PLEASE NOTE: You have defined entryFiles as an object.
This is not fully supported right now.
Please consider to use a single bundle and define entryFiles as an Array
or know what you are doing.
`);

    return options.entryFiles;
};
