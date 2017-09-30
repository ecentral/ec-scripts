const fs = require('fs');

/**
 * Tests if a config file exists in path, then requires it.
 * If it does not exist, an empty object is returned instead.
 * @param {string} path The path where the config should be
 */
const getConfig = (path = './') => (
    fs.existsSync(`${path}/ecconf.js`)
        ? require(`${path}/ecconf`)
        : {}
);

module.exports = getConfig;
