const fs = require('fs');
const path = require('path');
const settings = require('../settings');

/**
 * Tests if a config file exists in path, then requires it.
 * If it does not exist, an empty object is returned instead.
 * @param {string} absPath The absolute directory path where the config should be
 */
const requireConfig = (absPath) => {
    const ecconfFilename = settings.ecconfFilenames.find(
        name => fs.existsSync(path.join(absPath, name))
    );

    return ecconfFilename
        ? require(path.join(absPath, ecconfFilename))
        : {};
};

module.exports = requireConfig;
