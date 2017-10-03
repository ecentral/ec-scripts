const path = require('path');
const requireBabelPresets = require('../../../lib/utils/requireBabelPresets');

module.exports = ({ browserList }) => ({
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            query: {
                presets: requireBabelPresets([
                    ['env', {
                        modules: false,
                        targets: {
                            browsers: browserList,
                        },
                    }],
                    'stage-1',
                ]),
            },
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
