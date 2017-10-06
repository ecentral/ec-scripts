const fs = require('fs');
const path = require('path');

/**
 * Tests if a config file exists in path, then requires it.
 * If it does not exist, an empty object is returned instead.
 * @param {string} absPath The absolute directory path where the config should be
 */
const requireConfig = (absPath) => (
    fs.existsSync(path.join(absPath, 'ecconf.js'))
        ? require(path.join(absPath, 'ecconf.js'))
        : {}
);

module.exports = requireConfig;
