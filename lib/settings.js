const path = require('path');

// Define path to root directory
const rootPath = path.resolve(__dirname, '../');
// Define path to app / project root directory
const appPath = process.cwd();
// Define path to local node_modules
const nodeModulesPath = path.resolve(rootPath, 'node_modules');
// Define path to app node_modules
const appNodeModulesPath = path.resolve(appPath, 'node_modules');
// Define valid ecconf filenames
const ecconfFilenames = ['ecconf.js', '.ecconf.js'];

module.exports = {
    rootPath,
    appPath,
    nodeModulesPath,
    appNodeModulesPath,
    ecconfFilenames,
};
