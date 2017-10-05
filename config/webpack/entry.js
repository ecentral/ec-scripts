const path = require('path');
const invariant = require('invariant');

module.exports = ({
    devMode,
    host,
    port,
    srcDir,
    entryFiles,
}) => {
    const bundledEntries = [];

    if (devMode) {
        const url = `http://${host}:${port}`;
        bundledEntries.push(
            `webpack-dev-server/client?${url}`,
            'webpack/hot/dev-server'
        );
    }

    bundledEntries.push('babel-polyfill');

    if (Array.isArray(entryFiles)) {
        return {
            main: [
                ...bundledEntries,
                ...entryFiles.map(file => `./${path.join(srcDir, file)}`),
            ],
        };
    }

    invariant(
        typeof entryFiles === 'object',
        `Invalid type of 'entryFiles'. Please use an Array. Received: ${typeof entryFiles}`
    );

    console.warn(`
PLEASE NOTE: You have defined entryFiles as an object.
This is not fully supported right now.
Please consider to use a single bundle and define entryFiles as an Array
or know what you are doing.
`);

    return entryFiles;
};
