const path = require('path');

module.exports = ({ distDir }) => ({
    path: path.resolve(distDir),
    publicPath: '/',
    filename: '[name].bundle.js',
});
