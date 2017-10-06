const path = require('path');

// Define path to root directory
const rootPath = path.resolve(__dirname, '../');
// Define path to local node_modules
const nodeModulesPath = path.resolve(rootPath, 'node_modules');

module.exports = {
    rootPath,
    nodeModulesPath,
};
