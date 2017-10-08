const path = require('path');
const babelJest = require('babel-jest');
const settings = require('../../lib/settings');

module.exports = babelJest.createTransformer({
    // Unfortunately we can not run this script and inject our
    // config in here. babel-jest accepts a path to .babelrc, though.
    // Therefore we use this static file.
    babelrc: path.resolve(settings.appPath, '.babelrc'),
});
