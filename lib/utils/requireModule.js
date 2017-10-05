const path = require('path');
const settings = require('../settings');

/**
 * Requires a node module from the local node_modules directory.
 * @param {string} packageName
 */
const requireModule = (packageName) => (
    require(path.resolve(settings.nodeModulesPath, packageName))
);

module.exports = requireModule;
