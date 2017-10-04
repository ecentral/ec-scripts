const path = require('path');

module.exports = (addons) => ({
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            query: addons.babel,
        },
        {
            loader: 'eslint-loader',
            options: {
                // TODO: Use correct eslint config from combined configuration object if possible.
                // The configFile option seems to accept only a static path, not an object.
                // If omitted this defaults to: [projectRoot]/.eslintrc*
                configFile: path.resolve(__dirname, '../../../.eslintrc.js'),
            },
        },
    ],
    exclude: /node_modules/,
});
